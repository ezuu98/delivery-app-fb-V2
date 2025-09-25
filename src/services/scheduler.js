const { listOrders } = require('./shopify');
const orderModel = require('../models/orderModel');
const { getFirestore } = require('./firestore');
const log = require('../utils/logger');

let timer = null;

function getInterval(){
  const v = Number(process.env.SHOPIFY_SYNC_INTERVAL_MS || '300000');
  return Number.isFinite(v) && v > 10000 ? v : 300000; // min 10s, default 5m
}

async function ensureFirestoreStatusNew(orders){
  try{
    const db = getFirestore();
    if (!db) return;
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
  }catch(_){ /* ignore scheduler firestore errors */ }
}

async function syncOnce(){
  try{
    const { orders = [], error } = await listOrders({ limit: 100 });
    if (error) {
      log.warn('scheduler.orders.error', { error });
      return;
    }
    await orderModel.upsertMany(orders);
    await ensureFirestoreStatusNew(orders);
    log.info('scheduler.orders.synced', { count: orders.length, lastSyncAt: await orderModel.getLastSync() });
  }catch(e){
    log.error('scheduler.orders.exception', { message: e?.message });
  }
}

function start(){
  if (timer) return;
  const iv = getInterval();
  log.info('scheduler.start', { intervalMs: iv });
  timer = setInterval(syncOnce, iv);
  // Prime cache on start, but do not block server
  setTimeout(syncOnce, 1000);
}

function stop(){
  if (timer) { clearInterval(timer); timer = null; }
}

module.exports = { start, stop, syncOnce };
