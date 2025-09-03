const { Router } = require('express');
const path = require('path');
const homeController = require('../controllers/homeController');
// SSR pages removed; using SPA
const apiController = require('../controllers/apiController');
const { getClientConfig } = require('../controllers/firebaseAuthController');
const authRoutes = require('./auth');
const { ensureAuthenticated, ensureAuthenticatedJson } = require('../middleware/auth');

const router = Router();

router.use('/auth', authRoutes);

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
router.post('/api/orders/:id/assign', ensureAuthenticatedJson, apiController.assignOrder);
router.post('/api/orders/:id/unassign', ensureAuthenticatedJson, apiController.unassignOrder);
router.get('/api/reports', ensureAuthenticatedJson, apiController.reports);

module.exports = router;
