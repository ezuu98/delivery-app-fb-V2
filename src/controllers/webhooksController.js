const crypto = require('crypto');
const log = require('../utils/logger');
const orderModel = require('../models/orderModel');
const { getFirestore } = require('../services/firestore');

function verifyShopify(req) {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET || '';
  const hmac = req.get('X-Shopify-Hmac-SHA256') || '';
  if (!secret || !hmac || !Buffer.isBuffer(req.body)) return false;
  const digest = crypto
    .createHmac('sha256', secret)
    .update(req.body)
    .digest('base64');
  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmac));
  } catch {
    return false;
  }
}

async function upsertFirestore(order, { ensureRiderField = false } = {}){
  try{
    const db = getFirestore();
    if (!db) return;
    const id = String(order?.id || order?.name || order?.order_number || '');
    if (!id) return;

    const ref = db.collection('orders').doc(id);

    const billing = order.billing_address || order.shipping_address || {};
    const client = order.client_details || {};
    const presentmentAmt = (order.presentment_money && (order.presentment_money.amount || order.presentment_money.total)) || null;
    const shopAmt = (order.shop_money && (order.shop_money.amount || order.shop_money.total)) || null;

    const payload = {
      orderId: id,
      name: order.name || null,
      order_number: order.order_number || null,
      created_at: order.created_at || null,
      billing_address: {
        address1: billing.address1 || null,
        address2: billing.address2 || null,
        city: billing.city || null,
        name: billing.name || null,
        phone: billing.phone || null,
        latitude: billing.latitude !== undefined ? (Number.isFinite(Number(billing.latitude)) ? Number(billing.latitude) : null) : null,
        longitude: billing.longitude !== undefined ? (Number.isFinite(Number(billing.longitude)) ? Number(billing.longitude) : null) : null,
      },
      cancel_reason: order.cancel_reason || null,
      cancelled_at: order.cancelled_at || null,
      client_details: {
        confirmed: client.confirmed !== undefined ? client.confirmed : (order.confirmed !== undefined ? order.confirmed : null),
        contact_email: client.contact_email || null,
        created_at: client.created_at || null,
      },
      closed_at: order.closed_at || null,
      confirmed: order.confirmed !== undefined ? order.confirmed : null,
      presentment_money_amount: presentmentAmt,
      shop_money_amount: shopAmt,
      current_total_price: order.current_total_price || null,
    };

    // Include riderId only when safe:
    // - If Shopify payload includes it (rare), propagate it
    // - If ensureRiderField is true, set riderId: null only when the field does not exist yet
    if (order && Object.prototype.hasOwnProperty.call(order, 'riderId')) {
      payload.riderId = order.riderId;
    } else if (ensureRiderField) {
      const snap = await ref.get();
      const existing = snap.exists ? (snap.data() || {}) : {};
      if (!Object.prototype.hasOwnProperty.call(existing, 'riderId')) {
        payload.riderId = null;
      }
    }

    // Populate riderId from existing assignment if present; otherwise only ensure field exists when requested
    try{
      const assignment = await orderModel.getAssignment(id).catch(()=>null);
      if (assignment && assignment.riderId) payload.riderId = String(assignment.riderId);
    }catch(_){}

    await ref.set(payload, { merge: true });
  }catch(e){ log.warn('firestore.upsert.order.failed', { message: e?.message }); }
}

async function deleteFirestore(orderId){
  try{
    const db = getFirestore();
    if (!db) return;
    await db.collection('orders').doc(String(orderId)).delete();
  }catch(e){ log.warn('firestore.delete.order.failed', { message: e?.message }); }
}

function parseBody(req){
  try{ return JSON.parse(req.body.toString('utf8') || '{}'); }catch{ return null; }
}

module.exports = {
  shopifyOrderCreate: async (req, res) => {
    if (!verifyShopify(req)) return res.status(401).end();
    const payload = parseBody(req);
    const order = payload && (payload.order || payload);
    if (order) {
      await orderModel.upsertMany([order]);
      // Ensure riderId field exists on initial create without overwriting any existing value
      await upsertFirestore(order, { ensureRiderField: true });
      log.info('webhook.orders.create', { id: order.id });
    }
    return res.status(200).end();
  },
  shopifyOrderUpdated: async (req, res) => {
    if (!verifyShopify(req)) return res.status(401).end();
    const order = parseBody(req);
    if (order) {
      await orderModel.upsertMany([order]);
      await upsertFirestore(order);
      log.info('webhook.orders.updated', { id: order.id });
    }
    return res.status(200).end();
  },
  shopifyOrderFulfilled: async (req, res) => {
    if (!verifyShopify(req)) return res.status(401).end();
    const order = parseBody(req);
    if (order) {
      await orderModel.upsertMany([order]);
      await upsertFirestore(order);
      log.info('webhook.orders.fulfilled', { id: order.id });
    }
    return res.status(200).end();
  },
  shopifyOrderCancelled: async (req, res) => {
    if (!verifyShopify(req)) return res.status(401).end();
    const order = parseBody(req);
    if (order) {
      await orderModel.upsertMany([order]);
      await upsertFirestore(order);
      log.info('webhook.orders.cancelled', { id: order.id });
    }
    return res.status(200).end();
  },
};
