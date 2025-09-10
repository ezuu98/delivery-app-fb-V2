const redisSvc = require('../services/redis');
const { getFirestore } = require('../services/firestore');
const log = require('../utils/logger');

// In-memory fallback
let ordersById = new Map();
let assignments = new Map();
let lastSyncAt = null;

function normalizeId(o){
  return String(o?.id || o?.name || o?.order_number || o?.orderNumber || '');
}

async function ensureRedis(){
  if (redisSvc.isReady()) return true;
  const cli = await redisSvc.connect();
  return !!cli;
}

async function upsertMany(list){
  if(!Array.isArray(list) || !list.length) return;
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    const pipeline = cli.multi();
    for(const o of list){
      const id = normalizeId(o); if(!id) continue;
      pipeline.hSet('orders', id, JSON.stringify(o));
    }
    pipeline.set('orders:lastSyncAt', new Date().toISOString());
    await pipeline.exec();
  } else {
    for(const o of list){ const id = normalizeId(o); if(!id) continue; ordersById.set(id, o); }
    lastSyncAt = new Date().toISOString();
  }

  // Best-effort: persist to Firestore so orders are available in DB for other services
  try{
    const db = getFirestore();
    if (db && Array.isArray(list) && list.length){
      const chunkSize = 500;
      for (let i = 0; i < list.length; i += chunkSize){
        const batch = db.batch();
        const slice = list.slice(i, i + chunkSize);
        const assigns = await listAssignments().catch(()=>[]);
        const aMap = new Map(assigns.map(a => [String(a.orderId), a]));
        for (const o of slice){
          const id = String(o?.id || o?.name || o?.order_number || `order-${Date.now()}`);
          const ref = db.collection('orders').doc(id);

          const shipping = o.shipping_address || {};
          const billing = o.billing_address || {};
          const client = o.client_details || {};
          const shippingStr = [shipping.address1 || '', shipping.city || '', shipping.province || '', shipping.country || '']
            .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;
          const billingStr = [billing.address1 || '', billing.city || '', billing.province || '', billing.country || '']
            .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;

          const payload = {
            orderId: id,
            order_number: o.order_number || null,
            name: o.name || null,
            phone: o.phone || billing.phone || shipping.phone || null,
            email: o.email || client.contact_email || null,
            riderId: undefined,
            shipping_address: shippingStr,
            billing_address: billingStr,
            latitude: (billing.latitude !== undefined ? Number(billing.latitude) : (shipping.latitude !== undefined ? Number(shipping.latitude) : undefined)),
            longitude: (billing.longitude !== undefined ? Number(billing.longitude) : (shipping.longitude !== undefined ? Number(shipping.longitude) : undefined)),
            cancel_reason: o.cancel_reason || null,
            cancelled_at: o.cancelled_at || null,
            client_details_confirmed: (client.confirmed !== undefined ? client.confirmed : (o.confirmed !== undefined ? o.confirmed : null)),
            notes: o.note || null,
            created_at: o.created_at || null,
            order_status: undefined,
          };
          payload.latitude = (payload.latitude !== undefined && Number.isFinite(payload.latitude)) ? payload.latitude : null;
          payload.longitude = (payload.longitude !== undefined && Number.isFinite(payload.longitude)) ? payload.longitude : null;

          const assigned = aMap.get(id);
          if (assigned && assigned.riderId) payload.riderId = String(assigned.riderId);

          const fs = String(o.fulfillment_status || '').toLowerCase();
          if (fs === 'fulfilled') payload.order_status = 'delivered';
          else if (fs === 'partial') payload.order_status = 'in-transit';
          else if (assigned && assigned.riderId) payload.order_status = 'assigned';
          else payload.order_status = 'new';

          if (payload.riderId === undefined) delete payload.riderId;

          batch.set(ref, payload, { merge: true });
        }
        await batch.commit();
      }
    }
  }catch(e){ log.warn('orders.upsertMany.firestore.failed', { message: e?.message }); }
}

async function getAll(){
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    const all = await cli.hGetAll('orders');
    return Object.values(all || {}).map(v=>{ try{return JSON.parse(v);}catch{return null; } }).filter(Boolean);
  }
  return Array.from(ordersById.values());
}

async function getById(id){
  const key = String(id);
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    const v = await cli.hGet('orders', key);
    return v ? JSON.parse(v) : null;
  }
  return ordersById.get(key) || null;
}

async function assign(orderId, riderId){
  const id = String(orderId);
  const rec = { riderId: String(riderId), assignedAt: new Date().toISOString(), status: 'assigned' };
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    await cli.hSet('assignments', id, JSON.stringify(rec));
  } else {
    assignments.set(id, rec);
  }

  // Update cached order record (redis or in-memory) so UI status reflects assignment immediately
  try{
    const has = await ensureRedis();
    if (has) {
      const cli = redisSvc.getClient();
      const raw = await cli.hGet('orders', id);
      if (raw) {
        try{
          const ord = JSON.parse(raw);
          // normalize tags to array
          let tags = Array.isArray(ord.tags) ? ord.tags.slice() : (typeof ord.tags === 'string' ? ord.tags.split(',').map(s=>s.trim()).filter(Boolean) : []);
          if (!tags.map(t=>t.toLowerCase()).includes('assigned')) tags.push('assigned');
          ord.tags = tags;
          ord.riderId = String(riderId);
          ord.assignedAt = rec.assignedAt;
          await cli.hSet('orders', id, JSON.stringify(ord));
        }catch(e){ /* ignore JSON parse errors */ }
      }
    } else {
      const ord = ordersById.get(id) || null;
      if (ord) {
        let tags = Array.isArray(ord.tags) ? ord.tags.slice() : (typeof ord.tags === 'string' ? ord.tags.split(',').map(s=>s.trim()).filter(Boolean) : []);
        if (!tags.map(t=>t.toLowerCase()).includes('assigned')) tags.push('assigned');
        ord.tags = tags;
        ord.riderId = String(riderId);
        ord.assignedAt = rec.assignedAt;
        ordersById.set(id, ord);
      }
    }
  }catch(e){ log.warn('order.cache.update.assign.failed', { message: e?.message }); }

  // Persist to Firestore (best-effort)
  try{
    const db = getFirestore();
    if (db) {
      // store assignment record
      await db.collection('assignments').doc(id).set({ orderId: id, ...rec }, { merge: true });
      // also persist riderId directly on the order document so downstream consumers can read it from orders collection
      try{
        await db.collection('orders').doc(id).set({ riderId: String(riderId), assignedAt: rec.assignedAt }, { merge: true });
      }catch(e){ log.warn('firestore.orders.assign.failed', { message: e?.message }); }
    }
  }catch(e){ log.warn('firestore.assignments.set.failed', { message: e?.message }); }
  return rec;
}

async function unassign(orderId){
  const id = String(orderId);
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    await cli.hDel('assignments', id);
  } else {
    assignments.delete(id);
  }
  try{
    // update cache first
    try{
      const has = await ensureRedis();
      if (has) {
        const cli = redisSvc.getClient();
        const raw = await cli.hGet('orders', id);
        if (raw) {
          try{
            const ord = JSON.parse(raw);
            let tags = Array.isArray(ord.tags) ? ord.tags.slice() : (typeof ord.tags === 'string' ? ord.tags.split(',').map(s=>s.trim()).filter(Boolean) : []);
            tags = tags.filter(t => String(t || '').toLowerCase() !== 'assigned');
            ord.tags = tags;
            ord.riderId = null;
            ord.assignedAt = null;
            ord.unassignedAt = new Date().toISOString();
            await cli.hSet('orders', id, JSON.stringify(ord));
          }catch(e){}
        }
      } else {
        const ord = ordersById.get(id) || null;
        if (ord) {
          let tags = Array.isArray(ord.tags) ? ord.tags.slice() : (typeof ord.tags === 'string' ? ord.tags.split(',').map(s=>s.trim()).filter(Boolean) : []);
          tags = tags.filter(t => String(t || '').toLowerCase() !== 'assigned');
          ord.tags = tags;
          ord.riderId = null;
          ord.assignedAt = null;
          ord.unassignedAt = new Date().toISOString();
          ordersById.set(id, ord);
        }
      }
    }catch(e){ log.warn('order.cache.update.unassign.failed', { message: e?.message }); }

    const db = getFirestore();
    if (db) {
      await db.collection('assignments').doc(id).set({ orderId: id, status: 'unassigned', unassignedAt: new Date().toISOString() }, { merge: true });
      try{
        // clear riderId from the order document
        await db.collection('orders').doc(id).set({ riderId: null, assignedAt: null, unassignedAt: new Date().toISOString() }, { merge: true });
      }catch(e){ log.warn('firestore.orders.unassign.failed', { message: e?.message }); }
    }
  }catch(e){ log.warn('firestore.assignments.unassign.failed', { message: e?.message }); }
}

async function getAssignment(orderId){
  const id = String(orderId);
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    const v = await cli.hGet('assignments', id);
    if (v) return JSON.parse(v);
  } else {
    const v = assignments.get(id) || null;
    if (v) return v;
  }
  // Fallback to Firestore
  try{
    const db = getFirestore();
    if (db){
      const snap = await db.collection('assignments').doc(id).get();
      if (snap.exists) return snap.data() || null;
    }
  }catch(e){ log.warn('firestore.assignments.get.failed', { message: e?.message }); }
  return null;
}

async function listAssignments(){
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    const all = await cli.hGetAll('assignments');
    const list = Object.entries(all || {}).map(([orderId, v])=> ({ orderId, ...(v ? JSON.parse(v) : {}) }));
    if (list.length) return list;
  } else {
    const list = Array.from(assignments.entries()).map(([orderId, a])=> ({ orderId, ...a }));
    if (list.length) return list;
  }
  // Fallback to Firestore
  try{
    const db = getFirestore();
    if (db){
      const snap = await db.collection('assignments').get();
      const res = [];
      snap.forEach(doc => { const d = doc.data() || {}; res.push({ orderId: String(d.orderId || doc.id), ...d }); });
      return res;
    }
  }catch(e){ log.warn('firestore.assignments.list.failed', { message: e?.message }); }
  return [];
}

async function getLastSync(){
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    return await cli.get('orders:lastSyncAt');
  }
  return lastSyncAt;
}

module.exports = { upsertMany, getAll, getById, assign, unassign, getAssignment, listAssignments, getLastSync };
