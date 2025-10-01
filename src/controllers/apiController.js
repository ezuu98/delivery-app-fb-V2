const orderModel = require('../models/orderModel');
const riderModel = require('../models/riderModel');
const deliveryModel = require('../models/deliveryModel');
const { getFirestore } = require('../services/firestore');
const { listOrders, isConfigured, fetchAllOrders } = require('../services/shopify');
const { ok, fail } = require('../utils/response');
const log = require('../utils/logger');
const { paginate, parseIntParam } = require('../utils/pagination');

async function findOrderByAnyId(id){
  const raw = String(id || '');
  const tried = [];
  const candidates = [];
  // try exact
  candidates.push(raw);
  // try stripped (# removed)
  candidates.push(raw.replace(/^#+/, ''));
  // try with single leading #
  if(!raw.startsWith('#')) candidates.push('#' + raw);
  // try with double leading #
  if(!raw.startsWith('##')) candidates.push('##' + raw);

  // Prefer Firestore lookup first (so UI reads from Firestore)
  try{
    const db = getFirestore();
    if (db) {
      // Try direct document id lookups
      for (const k of candidates) {
        if (!k) continue;
        tried.push(k);
        try{
          const snap = await db.collection('orders').doc(String(k)).get();
          if (snap && snap.exists) return { key: String(k), order: snap.data() || {} };
        }catch(_){ /* ignore per-candidate errors */ }
      }

      // If direct doc lookups failed, try querying common fields (orderId, order_number, name)
      const queryFields = ['orderId','order_number','name','order_number'];
      for (const k of candidates) {
        if (!k) continue;
        for (const field of queryFields) {
          try{
            const q = await db.collection('orders').where(field, '==', k).limit(1).get();
            if (q && !q.empty) {
              const doc = q.docs[0];
              return { key: String(doc.id), order: doc.data() || {} };
            }
          }catch(_){ /* ignore query errors */ }
        }
      }

      // Also try numeric equality for order_number (as number)
      if (/^\d+$/.test(raw)){
        const num = raw;
        try{
          const q = await db.collection('orders').where('order_number', '==', num).limit(1).get();
          if (q && !q.empty) { const doc = q.docs[0]; return { key: String(doc.id), order: doc.data() || {} }; }
        }catch(_){ }
      }
    }
  }catch(_){ /* ignore firestore errors */ }

  // Fallback to cache (redis/in-memory)
  for(const k of candidates){
    if(!k) continue;
    if (!tried.includes(k)) tried.push(k);
    try{
      const o = await orderModel.getById(String(k));
      if(o) return { key: String(k), order: o };
    }catch(_){ }
  }

  // As last resort, try scanning assignments/cache keys for matching order_number/name
  try{
    const all = await orderModel.getAll();
    for(const o of all){
      const keys = [String(o.id||''), String(o.name||''), String(o.order_number||'')].map(s=>s.replace(/^#+/,''));
      if(keys.includes(raw.replace(/^#+/,''))) return { key: String(o.id||o.name||o.order_number||''), order: o };
    }
  }catch(_){ }

  return { key: null, order: null, tried };
}

module.exports = {
  riders: async (req, res) => {
    const { q = '', status = 'all', lastDays = 'all', page = '1', limit = '20' } = req.query || {};
    const list = await riderModel.list();
    const filtered = list.filter(r => {
      if (q && !String(r.name || '').toLowerCase().includes(String(q).toLowerCase())) return false;
      if (status !== 'all' && String(r.status) !== String(status)) return false;
      if (lastDays !== 'all') {
        const n = parseIntParam(lastDays, 0);
        const last = parseInt(r.lastActiveDays, 10) || 9999;
        if (!(last <= n)) return false;
      }
      return true;
    });
    const p = paginate(filtered, parseIntParam(page, 1), parseIntParam(limit, 20));
    return res.json(ok({ riders: p.items }, p.meta));
  },
  riderProfile: async (req, res) => {
    const rider = await riderModel.getById(req.params.id);
    if (!rider) return res.status(404).json(fail('Not Found'));

    const totalDeliveries = Math.max(1, Math.round(rider.totalKm * 2));
    const avgDeliveryMins = Math.max(10, Math.round(60 - (rider.performance / 100) * 30));
    const onTimeRate = Math.min(99, Math.max(60, rider.performance + 5));

    const history = Array.from({ length: 10 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const deliveries = Math.max(0, Math.round((rider.performance / 10) + (i % 3) * 2));
      const avg = avgDeliveryMins + ((i % 2) ? 3 : -2);
      const km = Math.max(1, Math.round(deliveries * (3 + (i % 4))));
      return { date: date.toISOString().slice(0, 10), deliveries, avgTime: avg, distanceKm: km };
    }).reverse();

    return res.json(ok({ rider, metrics: { totalDeliveries, avgDeliveryMins, onTimeRate, totalKm: rider.totalKm }, history }));
  },
  orders: async (req, res) => {
    try{
      const { q = '', status = 'all', created_at_min, created_at_max, page = '1', limit = '20' } = req.query || {};

      // Prefer Firestore as the canonical data source for UI
      let cached = [];
      try{
        const db = getFirestore();
        if (db) {
          const snap = await db.collection('orders').get();
          snap.forEach(doc => { const d = doc.data() || {}; cached.push(d); });
        }
      }catch(e){ /* firestore might not be available; fallback below */ }

      // If Firestore empty, fall back to cached in-memory/redis and as last resort fetch from Shopify
      if (!cached.length) {
        cached = await orderModel.getAll();
        if (!cached.length) {
          const { orders = [], error } = await listOrders({ limit: 100 });
          if (error) log.warn('orders.fetch.error', { error });
          await orderModel.upsertMany(orders);
          try{
            const db = getFirestore();
            if (db && Array.isArray(orders) && orders.length){
              for (const o of orders){
                const id = String(o?.id || o?.name || o?.order_number || '');
                if (!id) continue;
                try{
                  const ref = db.collection('orders').doc(id);
                  const snap = await ref.get();
                  const existing = snap.exists ? (snap.data() || {}) : {};
                  const payload = { orderId: id };
                  if (!Object.prototype.hasOwnProperty.call(existing, 'current_status')) payload.current_status = 'new';
                  if (!Object.prototype.hasOwnProperty.call(existing, 'order_status')) payload.order_status = 'new';
                  if (Object.keys(payload).length > 1) await ref.set(payload, { merge: true });
                }catch(_){ /* continue next */ }
              }
            }
          }catch(_){ /* ignore */ }
          cached = await orderModel.getAll();
        }
      }

      const ql = String(q).toLowerCase().trim();
      function getOrderStatus(o){
        const cs = (o && typeof o.current_status === 'string') ? o.current_status.toLowerCase().trim() : '';
        return cs;
      }
      const fromTs = created_at_min ? Date.parse(created_at_min) : null;
      const toTs = created_at_max ? Date.parse(created_at_max) : null;


      const filtered = cached.filter(o => {
        if (status !== 'all' && getOrderStatus(o) !== status) return false;
        if (ql){
          const name = String(o.name || o.order_number || o.id || '').toLowerCase();
          const customer = String(o.full_name || o.customer?.full_name || '').toLowerCase();
          const addr = String((typeof o.shipping_address === 'string' ? o.shipping_address : (o.shipping_address?.address1 ? `${o.shipping_address.address1} ${o.shipping_address.city||''}` : JSON.stringify(o.shipping_address || o.billing_address || {}))) || '').toLowerCase();
          const text = `${name} ${customer} ${addr}`;
          if(!text.includes(ql)) return false;
        }
        if (fromTs || toTs){
          const t = o.created_at ? Date.parse(o.created_at) : null;
          if (!t) return false;
          if (fromTs && t < fromTs) return false;
          if (toTs && t > toTs) return false;
        }
        return true;
      });

      // Sort filtered results by created_at descending (latest first)
      filtered.sort((a, b) => {
        const ta = a && a.created_at ? Date.parse(a.created_at) : 0;
        const tb = b && b.created_at ? Date.parse(b.created_at) : 0;
        return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0);
      });

      const { items, meta } = paginate(filtered, parseIntParam(page, 1), parseIntParam(limit, 20));

      const assigns = await orderModel.listAssignments();
      const amap = new Map(assigns.map(a => [String(a.orderId), a]));
      const riders = await riderModel.list().catch(()=>[]);
      const rmap = new Map(riders.map(r => [String(r.id), r.name]));

      // Merge delivery events (expected times and actual delivered time) into orders
      const evAll = await deliveryModel.listAll();
      const etaMap = new Map();
      const actualMap = new Map();
      for (const { orderId, events } of evAll){
        if (!orderId || !Array.isArray(events)) continue;
        // find last 'eta' event and last 'delivered' event
        for (let i = events.length - 1; i >= 0; i--){
          const ev = events[i];
          if (!ev) continue;
          if (ev.type === 'eta' && !etaMap.has(String(orderId))) etaMap.set(String(orderId), ev);
          if (ev.type === 'delivered' && !actualMap.has(String(orderId))) actualMap.set(String(orderId), ev);
          if (etaMap.has(String(orderId)) && actualMap.has(String(orderId))) break;
        }
      }

      const withAssignments = items.map(o => {
        const idKey = String(o.orderId || o.id || o.name || o.order_number || '');
        const assignment = amap.get(idKey) || null;
        const eta = etaMap.get(idKey) || null;
        const delivered = actualMap.get(idKey) || null;
        const riderId = assignment?.riderId || (eta?.riderId || null);
        const riderName = riderId ? (rmap.get(String(riderId)) || null) : null;
        const base = { ...o };
        return {
          ...base,
          assignment,
          riderId: riderId || null,
          rider: riderName || (riderId ? String(riderId) : null),
          expected_delivery_time: (o.deliveryStartTime || eta?.expectedAt || o.expected_delivery_time || null),
          actual_delivery_time: (o.deliveryEndTime || delivered?.at || o.actual_delivery_time || null),
        };
      });

      return res.json(ok({ orders: withAssignments, shopifyError: null, shopifyConfigured: isConfigured() }, meta));
    }catch(e){
      log.error('orders.list.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to load orders'));
    }
  },
  reports: async (req, res) => {
    try{
      const riders = await riderModel.list();
      const orders = await orderModel.getAll();
      const assigns = await orderModel.listAssignments();
      const aMap = new Map(assigns.map(a => [String(a.orderId), a]));
      const evAll = await deliveryModel.listAll();
      const eMap = new Map(evAll.map(e => [String(e.orderId), Array.isArray(e.events)?e.events:[]]));

      function parseIso(s){ const t = Date.parse(s); return Number.isFinite(t) ? new Date(t) : null; }
      function lastOf(list, type){
        for(let i=list.length-1;i>=0;i--){ if(list[i] && list[i].type === type) return list[i]; }
        return null;
      }

      const deliveries = [];
      for (const { orderId, events } of evAll){
        const id = String(orderId);
        const order = orders.find(o => String(o.id||o.name||o.order_number) === id) || null;
        const assignment = aMap.get(id) || null;
        const etaEv = lastOf(events, 'eta');
        const ofdEv = lastOf(events, 'out_for_delivery');
        const pickupEv = lastOf(events, 'pickup');
        const deliveredEv = lastOf(events, 'delivered');
        const startAt = ofdEv?.at || pickupEv?.at || (order?.created_at || null);
        const deliveredAt = deliveredEv?.at || null;
        let durationMins = null;
        if (startAt && deliveredAt){
          const t1 = Date.parse(startAt); const t2 = Date.parse(deliveredAt);
          if (Number.isFinite(t1) && Number.isFinite(t2) && t2 >= t1) durationMins = Math.round((t2 - t1) / 60000);
        }
        const status = deliveredAt ? 'delivered' : (ofdEv ? 'in-transit' : (assignment ? 'assigned' : 'new'));
        deliveries.push({
          orderId: id,
          orderNumber: order?.name || order?.order_number || id,
          riderId: assignment?.riderId || etaEv?.riderId || ofdEv?.riderId || pickupEv?.riderId || deliveredEv?.riderId || null,
          expectedMinutes: etaEv?.expectedMinutes ?? null,
          expectedAt: etaEv?.expectedAt ?? null,
          deliveredAt,
          durationMins,
          status,
        });
      }

      const completed = deliveries.filter(d => d.deliveredAt && Number.isFinite(d.durationMins));
      const totalDeliveries = completed.length;
      const avgDeliveryMins = completed.length ? Math.round(completed.reduce((a, d) => a + (d.durationMins || 0), 0) / completed.length) : 0;

      return res.json(ok({ metrics: { totalDeliveries, avgDeliveryMins }, deliveries, orders }));
    }catch(e){
      log.error('reports.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to load reports'));
    }
  },

  getOrder: async (req, res) => {
    const rawId = String(req.params.id);
    const found = await findOrderByAnyId(rawId);
    if (!found.order) return res.status(404).json(fail('Order not found'));
    const assignment = await orderModel.getAssignment(found.key);
    return res.json(ok({ order: { ...found.order, assignment: assignment || null } }));
  },

  addDeliveryEvent: async (req, res) => {
    const id = String(req.params.id);
    const order = await orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    const { type, riderId = null, timestamp = null, expectedMinutes = null, notes = null } = req.body || {};
    if (!type) return res.status(400).json(fail('Missing body.type'));
    const ev = await deliveryModel.addEvent(id, { type, riderId, at: timestamp, expectedMinutes, notes });
    if (!ev) return res.status(400).json(fail('Invalid event'));
    log.info('delivery.event.added', { orderId: id, type: ev.type, at: ev.at });
    return res.json(ok({ event: ev }));
  },

  getDeliveryEvents: async (req, res) => {
    const id = String(req.params.id);
    const order = await orderModel.getById(id);
    if (!order) return res.status(404).json(fail('Order not found'));
    const events = await deliveryModel.getEvents(id);
    return res.json(ok({ events }));
  },

  seedOrder: async (req, res) => {
    try{
      const id = String(req.body?.id || `TEST-${Date.now()}`);
      const order = {
        id,
        name: id,
        order_number: id,
        created_at: new Date().toISOString(),
        fulfillment_status: 'open',
        full_name: 'Test Customer',
        shipping_address: { address1: '123 Demo St', city: 'Demo City', province: 'DC', country: 'US' },
        tags: ['seed'],
      };
      await orderModel.upsertMany([order]);
      try{
        const db = getFirestore();
        if (db) {
          const id = String(order.id);
          const ref = db.collection('orders').doc(id);
          const shipping = order.shipping_address || {};
          const billing = order.billing_address || {};
          const client = order.client_details || {};
          const shippingStr = [shipping.address1 || '', shipping.city || '', shipping.province || '', shipping.country || '']
            .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;
          const billingStr = [billing.address1 || '', billing.city || '', billing.province || '', billing.country || '']
            .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;
          const payload = {
            orderId: id,
            order_number: order.order_number || null,
            name: order.name || null,
            phone: order.phone || billing.phone || shipping.phone || null,
            email: order.email || client.contact_email || null,
            riderId: null,
            shipping_address: shippingStr,
            billing_address: billingStr,
            latitude: (billing.latitude !== undefined ? Number(billing.latitude) : (shipping.latitude !== undefined ? Number(shipping.latitude) : undefined)),
            longitude: (billing.longitude !== undefined ? Number(billing.longitude) : (shipping.longitude !== undefined ? Number(shipping.longitude) : undefined)),
            cancel_reason: order.cancel_reason || null,
            cancelled_at: order.cancelled_at || null,
            client_details_confirmed: (client.confirmed !== undefined ? client.confirmed : (order.confirmed !== undefined ? order.confirmed : null)),
            notes: order.note || null,
            created_at: order.created_at || null,
            order_status: 'new',
            current_status: 'new',
            // Custom delivery time fields for seeded orders
            expected_delivery_time: null,
            actual_delivery_time: null,
          };
          payload.latitude = (payload.latitude !== undefined && Number.isFinite(payload.latitude)) ? payload.latitude : null;
          payload.longitude = (payload.longitude !== undefined && Number.isFinite(payload.longitude)) ? payload.longitude : null;
          await ref.set(payload, { merge: true });
        }
      }catch(_){}
      return res.json(ok({ order }));
    }catch(e){
      log.error('seed.order.failed', { message: e?.message });
      return res.status(500).json(fail('Failed to seed order'));
    }
  },

  // Admin sync disabled: only Shopify webhooks write orders to Firestore
  syncOrders: async (req, res) => {
    try{
      const db = getFirestore();
      if (!db) return res.status(503).json(fail('Firestore not configured'));

      const snap = await db.collection('orders').get();
      let processed = 0, updated = 0, errors = 0;

      function deriveStatus(o){
        const cs = (o && typeof o.current_status === 'string') ? o.current_status.toLowerCase() : null;
        if (cs === 'assigned' || cs === 'delivered' || cs === 'in-transit' || cs === 'new') return cs;
        // fallbacks
        const tags = Array.isArray(o.tags) ? o.tags : (typeof o.tags === 'string' ? o.tags.split(',') : []);
        const tagStr = tags.join(',').toLowerCase();
        if (o.actual_delivery_time) return 'delivered';
        if (o.order_status === 'delivered' || o.fulfillment_status === 'fulfilled') return 'delivered';
        if (o.order_status === 'in-transit' || o.fulfillment_status === 'partial') return 'in-transit';
        if (o.riderId || tagStr.includes('assigned') || o.order_status === 'assigned') return 'assigned';
        return 'new';
      }

      for (const doc of snap.docs){
        processed += 1;
        try{
          const data = doc.data() || {};
          const payload = { orderId: data.orderId || doc.id };
          // Backfill nullable fields
          if (!Object.prototype.hasOwnProperty.call(data, 'expected_delivery_time')) payload.expected_delivery_time = null;
          if (!Object.prototype.hasOwnProperty.call(data, 'actual_delivery_time')) payload.actual_delivery_time = null;
          if (!Object.prototype.hasOwnProperty.call(data, 'order_status')) payload.order_status = 'new';
          const nextStatus = deriveStatus(data);
          if (data.current_status !== nextStatus) payload.current_status = nextStatus;
          if (Object.keys(payload).length > 1){
            await doc.ref.set(payload, { merge: true });
            updated += 1;
          }
        }catch(_){ errors += 1; }
      }

      return res.json(ok({ processed, updated, errors }));
    }catch(e){
      return res.status(500).json(fail('Sync failed', null, { message: e?.message }));
    }
  },

  assignOrder: async (req, res) => {
    const rawId = String(req.params.id);
    const found = await findOrderByAnyId(rawId);
    if (!found.order) return res.status(404).json(fail('Order not found'));
    const id = found.key;
    const { riderId } = req.body || {};
    const rider = await riderModel.getById(riderId);
    if (!rider) return res.status(400).json(fail('Invalid rider'));
    const assignment = await orderModel.assign(id, riderId);
    log.info('order.assigned', { orderId: id, riderId });
    return res.json(ok({ assignment }));
  },

  unassignOrder: async (req, res) => {
    const rawId = String(req.params.id);
    const found = await findOrderByAnyId(rawId);
    if (!found.order) return res.status(404).json(fail('Order not found'));
    const id = found.key;
    await orderModel.unassign(id);
    log.info('order.unassigned', { orderId: id });
    return res.json(ok({ ok: true }));
  },
};
