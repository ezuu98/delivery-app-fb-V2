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

async function upsertFirestore(order){
  try{
    const db = getFirestore();
    if (!db) return;
    const id = String(order?.id || order?.name || order?.order_number || '');
    if (!id) return;
    await db.collection('orders').doc(id).set(order, { merge: true });
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
      await upsertFirestore(order);
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
