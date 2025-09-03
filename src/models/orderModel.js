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
  // Persist to Firestore (best-effort)
  try{
    const db = getFirestore();
    if (db) await db.collection('assignments').doc(id).set({ orderId: id, ...rec }, { merge: true });
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
    const db = getFirestore();
    if (db) await db.collection('assignments').doc(id).set({ orderId: id, status: 'unassigned', unassignedAt: new Date().toISOString() }, { merge: true });
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
