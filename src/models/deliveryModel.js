const redisSvc = require('../services/redis');
const { getFirestore } = require('../services/firestore');
const log = require('../utils/logger');

function normId(id){ return String(id || ''); }

async function ensureRedis(){
  if (redisSvc.isReady()) return true;
  const cli = await redisSvc.connect();
  return !!cli;
}

function nowIso(){ return new Date().toISOString(); }

const EVENT_TYPES = new Set(['eta','pickup','out_for_delivery','delivered','delay']);

function sanitizeEvent(e = {}){
  const type = String(e.type || '').trim();
  if (!EVENT_TYPES.has(type)) return null;
  const at = e.at ? new Date(e.at) : new Date();
  const obj = {
    type,
    at: isNaN(at.getTime()) ? nowIso() : at.toISOString(),
  };
  if (e.riderId != null) obj.riderId = String(e.riderId);
  if (e.expectedMinutes != null) {
    const n = Number(e.expectedMinutes);
    if (Number.isFinite(n) && n >= 0) {
      obj.expectedMinutes = n;
      const ts = new Date();
      obj.expectedAt = new Date(ts.getTime() + n * 60000).toISOString();
    }
  }
  if (e.notes != null) obj.notes = String(e.notes);
  return obj;
}

async function addEvent(orderId, event){
  const id = normId(orderId); if (!id) return null;
  const ev = sanitizeEvent(event); if (!ev) return null;
  let events = [];
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    const cur = await cli.hGet('delivery:events', id);
    if (cur) { try{ events = JSON.parse(cur) || []; }catch{ events = []; } }
    events.push(ev);
    await cli.hSet('delivery:events', id, JSON.stringify(events));
  } else {
    // In-memory fallback per-process
    if (!global.__deliveryEvents) global.__deliveryEvents = new Map();
    const cur = global.__deliveryEvents.get(id);
    events = Array.isArray(cur) ? cur.slice() : [];
    events.push(ev);
    global.__deliveryEvents.set(id, events);
  }

  // Firestore persistence (best-effort)
  try{
    const db = getFirestore();
    if (db) {
      const ref = db.collection('deliveryEvents').doc(id);
      const snap = await ref.get();
      const data = snap.exists ? (snap.data() || {}) : {};
      const list = Array.isArray(data.events) ? data.events.slice() : [];
      list.push(ev);
      await ref.set({ orderId: id, events: list }, { merge: true });
    }
  }catch(e){ log.warn('firestore.deliveryEvent.upsert.failed', { message: e?.message }); }

  return ev;
}

async function getEvents(orderId){
  const id = normId(orderId); if (!id) return [];
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    const cur = await cli.hGet('delivery:events', id);
    if (!cur) return [];
    try{ const arr = JSON.parse(cur); return Array.isArray(arr) ? arr : []; }catch{ return []; }
  }
  if (global.__deliveryEvents) {
    const arr = global.__deliveryEvents.get(id);
    return Array.isArray(arr) ? arr : [];
  }
  return [];
}

async function listAll(){
  const hasRedis = await ensureRedis();
  if (hasRedis) {
    const cli = redisSvc.getClient();
    const all = await cli.hGetAll('delivery:events');
    return Object.entries(all || {}).map(([orderId, json])=>{
      let events = [];
      try{ const arr = JSON.parse(json); if (Array.isArray(arr)) events = arr; }catch{}
      return { orderId, events };
    });
  }
  const res = [];
  if (global.__deliveryEvents) {
    for (const [orderId, events] of global.__deliveryEvents.entries()) res.push({ orderId, events: Array.isArray(events)?events:[] });
  }
  return res;
}

module.exports = { addEvent, getEvents, listAll, EVENT_TYPES: Array.from(EVENT_TYPES) };
