const { Router } = require('express');
const express = require('express');
const ctrl = require('../controllers/webhooksController');

const router = Router();

// Shopify webhooks expect raw application/json for HMAC verification
const rawJson = express.raw({ type: 'application/json' });

router.post('/shopify/orders/create', rawJson, ctrl.shopifyOrderCreate);
// router.post('/shopify/orders/updated', rawJson, ctrl.shopifyOrderUpdated);
// router.post('/shopify/orders/fulfilled', rawJson, ctrl.shopifyOrderFulfilled);
router.post('/shopify/orders/cancelled', rawJson, ctrl.shopifyOrderCancelled);

module.exports = router;
