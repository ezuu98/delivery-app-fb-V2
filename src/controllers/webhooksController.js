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

    // Extract top-level simple fields per spec (flat, no nested objects)
    const shipping = order.shipping_address || {};
    const billing = order.billing_address || {};
    const client = order.client_details || {};

    const shippingStr = [shipping.address1 || '', shipping.city || '', shipping.province || '', shipping.country || '']
      .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;
    const billingStr = [billing.address1 || '', billing.city || '', billing.province || '', billing.country || '']
      .map(s => String(s || '').trim()).filter(Boolean).join(', ') || null;

    // Derive customer name: prefer Shopify customer object, fallback to billing/shipping name
    const customerFirst = (order.customer && order.customer.first_name) ? String(order.customer.first_name) : null;
    const customerLast = (order.customer && order.customer.last_name) ? String(order.customer.last_name) : null;
    const fallbackName = billing.name || shipping.name || null;
    let fallbackFirst = null, fallbackLast = null;
    if (!customerFirst && fallbackName) {
      const parts = String(fallbackName).trim().split(/\s+/);
      fallbackFirst = parts.shift() || null;
      fallbackLast = parts.length ? parts.join(' ') : null;
    }

    // Build payload in requested order
    const payload = {
      orderId: id,
      order_number: order.order_number || null,
      name: order.name || null,
      customer: {
        first_name: customerFirst || fallbackFirst || null,
        last_name: customerLast || fallbackLast || null,
        full_name: (customerFirst || fallbackFirst || '') + ((customerLast || fallbackLast) ? (' ' + (customerLast || fallbackLast)) : '') || null,
      },
      phone: order.phone || billing.phone || shipping.phone || null,
      email: order.email || client.contact_email || null,
      riderId: undefined, // set below according to logic
      shipping_address: shippingStr,
      billing_address: billingStr,
      latitude: (billing.latitude !== undefined ? Number(billing.latitude) : (shipping.latitude !== undefined ? Number(shipping.latitude) : undefined)),
      longitude: (billing.longitude !== undefined ? Number(billing.longitude) : (shipping.longitude !== undefined ? Number(shipping.longitude) : undefined)),
      cancel_reason: order.cancel_reason || null,
      cancelled_at: order.cancelled_at || null,
      client_details_confirmed: (client.confirmed !== undefined ? client.confirmed : (order.confirmed !== undefined ? order.confirmed : null)),
      notes: order.note || null,
      created_at: order.created_at || null,
      order_status: undefined, // set below
      // Custom delivery time fields: only set to null when ensureRiderField is requested (created)
      expected_delivery_time: undefined,
      actual_delivery_time: undefined,
    };

    // Normalize lat/long to numbers or null
    payload.latitude = (payload.latitude !== undefined && Number.isFinite(payload.latitude)) ? payload.latitude : null;
    payload.longitude = (payload.longitude !== undefined && Number.isFinite(payload.longitude)) ? payload.longitude : null;

    // riderId population rules
    if (order && Object.prototype.hasOwnProperty.call(order, 'riderId')) {
      payload.riderId = order.riderId;
    }
    let assignment = null;
    try{
      assignment = await orderModel.getAssignment(id).catch(()=>null);
      if (assignment && assignment.riderId) payload.riderId = String(assignment.riderId);
    }catch(_){}
    if (payload.riderId === undefined && ensureRiderField) {
      const snap = await ref.get();
      const existing = snap.exists ? (snap.data() || {}) : {};
      if (!Object.prototype.hasOwnProperty.call(existing, 'riderId')) payload.riderId = null;
      // Also ensure delivery time fields exist on initial create without overwriting existing values
      if (!Object.prototype.hasOwnProperty.call(existing, 'expected_delivery_time')) payload.expected_delivery_time = null;
      if (!Object.prototype.hasOwnProperty.call(existing, 'actual_delivery_time')) payload.actual_delivery_time = null;
    }

    // Derive order_status
    const fs = String(order.fulfillment_status || '').toLowerCase();
    if (fs === 'fulfilled') payload.order_status = 'delivered';
    else if (fs === 'partial') payload.order_status = 'in-transit';
    else if (assignment && assignment.riderId) payload.order_status = 'assigned';
    else payload.order_status = 'new';

    if (payload.riderId === undefined) delete payload.riderId;
    if (payload.expected_delivery_time === undefined) delete payload.expected_delivery_time;
    if (payload.actual_delivery_time === undefined) delete payload.actual_delivery_time;

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
