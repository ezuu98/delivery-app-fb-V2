const { listOrders } = require('./shopify');
const orderModel = require('../models/orderModel');
const { getFirestore } = require('./firestore');
const log = require('../utils/logger');

let timer = null;

function getInterval(){
  const v = Number(process.env.SHOPIFY_SYNC_INTERVAL_MS || '300000');
  return Number.isFinite(v) && v > 10000 ? v : 300000; // min 10s, default 5m
}

function buildFirestoreOrderPayload(order, id){
  const shipping = order?.shipping_address || {};
  const billing = order?.billing_address || {};
  const client = order?.client_details || {};

  const shippingStr = [shipping.address1 || '', shipping.city || '', shipping.province || '', shipping.country || '']
    .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;
  const billingStr = [billing.address1 || '', billing.city || '', billing.province || '', billing.country || '']
    .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;

  const customerFirst = (order?.customer && order.customer.first_name) ? String(order.customer.first_name) : null;
  const customerLast = (order?.customer && order.customer.last_name) ? String(order.customer.last_name) : null;
  const fallbackName = billing.name || shipping.name || null;
  let fallbackFirst = null;
  let fallbackLast = null;
  if (!customerFirst && fallbackName) {
    const parts = String(fallbackName).trim().split(/\s+/);
    fallbackFirst = parts.shift() || null;
    fallbackLast = parts.length ? parts.join(' ') : null;
  }
  const nameParts = [];
  if (customerFirst || fallbackFirst) nameParts.push(customerFirst || fallbackFirst);
  if (customerLast || fallbackLast) nameParts.push(customerLast || fallbackLast);
  const fullName = nameParts.length ? nameParts.join(' ') : null;

  const latitudeCandidate = billing.latitude !== undefined ? Number(billing.latitude) : (shipping.latitude !== undefined ? Number(shipping.latitude) : NaN);
  const longitudeCandidate = billing.longitude !== undefined ? Number(billing.longitude) : (shipping.longitude !== undefined ? Number(shipping.longitude) : NaN);
  const latitude = Number.isFinite(latitudeCandidate) ? latitudeCandidate : null;
  const longitude = Number.isFinite(longitudeCandidate) ? longitudeCandidate : null;

  return {
    orderId: id,
    order_number: order?.order_number || null,
    name: order?.name || null,
    full_name: fullName,
    phone: order?.phone || billing.phone || shipping.phone || null,
    email: order?.email || client.contact_email || null,
    riderId: null,
    packed_by: null,
    shipping_address: shippingStr,
    billing_address: billingStr,
    latitude,
    longitude,
    cancel_reason: order?.cancel_reason || null,
    cancelled_at: order?.cancelled_at || null,
    client_details_confirmed: client.confirmed !== undefined ? client.confirmed : (order?.confirmed !== undefined ? order.confirmed : null),
    notes: order?.note || null,
    created_at: order?.created_at || null,
    order_status: 'new',
    current_status: 'new',
    expected_delivery_time: null,
    actual_delivery_time: null,
  };
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
        if (!snap.exists) {
          const docPayload = buildFirestoreOrderPayload(o, id);
          await ref.set(docPayload, { merge: true });
          continue;
        }
        const existing = snap.data() || {};
        const payload = { orderId: id };
        if (!Object.prototype.hasOwnProperty.call(existing, 'current_status')) payload.current_status = 'new';
        if (!Object.prototype.hasOwnProperty.call(existing, 'order_status')) payload.order_status = 'new';
        if (!Object.prototype.hasOwnProperty.call(existing, 'expected_delivery_time')) payload.expected_delivery_time = null;
        if (!Object.prototype.hasOwnProperty.call(existing, 'actual_delivery_time')) payload.actual_delivery_time = null;
        if (!Object.prototype.hasOwnProperty.call(existing, 'packed_by')) payload.packed_by = null;
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
    const normalized = orders.map(o => ({
      ...o,
      current_status: o.current_status || 'new',
      order_status: o.order_status || 'new',
    }));
    await orderModel.upsertMany(normalized);
    await ensureFirestoreStatusNew(orders);
    log.info('scheduler.orders.synced', { count: normalized.length, lastSyncAt: await orderModel.getLastSync() });
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
