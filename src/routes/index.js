const { Router } = require('express');
const path = require('path');
const homeController = require('../controllers/homeController');
// SSR pages removed; using SPA
const apiController = require('../controllers/apiController');
const { getClientConfig } = require('../controllers/firebaseAuthController');
const authRoutes = require('./auth');
const { ensureAuthenticated, ensureAuthenticatedJson } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const mobileController = require('../controllers/mobileController');

const router = Router();

router.use('/auth', authRoutes);
router.use('/shopify', require('./shopify'));

// Runtime Firebase client config for SPA
router.get('/firebase-config.js', (req, res) => {
  const cfg = getClientConfig();
  res.type('application/javascript').send('window.__FIREBASE__=' + JSON.stringify(cfg) + ';');
});

router.get('/', (req, res) => { return req.user ? res.redirect('/dashboard') : res.redirect('/auth/login'); });
router.get('/messages', homeController.messages);
router.get('/dashboard', ensureAuthenticated, homeController.dashboard);

// SPA routes
const sendSpa = (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
router.get('/orders', ensureAuthenticated, sendSpa);
router.get('/riders', ensureAuthenticated, sendSpa);
router.get('/riders/:id', ensureAuthenticated, sendSpa);
router.get('/reports', ensureAuthenticated, sendSpa);

// Customers via SPA
router.get('/customers', ensureAuthenticated, sendSpa);

// API routes
router.get('/api/riders', ensureAuthenticatedJson, apiController.riders);
router.get('/api/riders/:id', ensureAuthenticatedJson, apiController.riderProfile);
router.get('/api/orders', ensureAuthenticatedJson, apiController.orders);
router.get('/api/orders/:id', ensureAuthenticatedJson, apiController.getOrder);
router.get('/api/orders/:id/delivery-events', ensureAuthenticatedJson, validate({ params: { id: 'string' } }), apiController.getDeliveryEvents);
router.post('/api/orders/:id/delivery-events', ensureAuthenticatedJson, validate({ params: { id: 'string' }, body: { type: 'string' } }), apiController.addDeliveryEvent);
router.post('/api/orders/:id/assign', ensureAuthenticatedJson, validate({ params: { id: 'string' }, body: { riderId: 'string' } }), apiController.assignOrder);
router.post('/api/orders/:id/unassign', ensureAuthenticatedJson, validate({ params: { id: 'string' } }), apiController.unassignOrder);
router.get('/api/reports', ensureAuthenticatedJson, apiController.reports);
router.post('/api/debug/seed-order', ensureAuthenticatedJson, apiController.seedOrder);
router.post('/api/admin/sync-orders', ensureAuthenticatedJson, apiController.syncOrders);
router.get('/api/debug/seed-order', ensureAuthenticatedJson, apiController.seedOrder);
router.get('/api/openapi.json', (req, res)=> res.type('application/json').sendFile(path.join(__dirname, '..', 'contracts', 'openapi.json')));

// Mobile API
router.post('/api/mobile/register', mobileController.register);
router.post('/api/mobile/login', mobileController.login);
router.get('/api/mobile/me', mobileController.me);
router.patch('/api/mobile/me', mobileController.updateProfile);
router.post('/api/mobile/bind-contact', mobileController.bindContact);
router.get('/api/mobile/orders', mobileController.listOrders);
router.get('/api/mobile/orders/:id', mobileController.getOrder);
router.post('/api/mobile/orders/:id/events', mobileController.addOrderEvent);

module.exports = router;
