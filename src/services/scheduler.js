const { listOrders } = require('./shopify');
const orderModel = require('../models/orderModel');
const log = require('../utils/logger');

let timer = null;

function getInterval(){
  const v = Number(process.env.SHOPIFY_SYNC_INTERVAL_MS || '300000');
  return Number.isFinite(v) && v > 10000 ? v : 300000; // min 10s, default 5m
}

async function syncOnce(){
  try{
    const { orders = [], error } = await listOrders({ limit: 100 });
    if (error) {
      log.warn('scheduler.orders.error', { error });
      return;
    }
    await orderModel.upsertMany(orders);
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
