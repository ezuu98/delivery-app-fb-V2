const { Router } = require('express');
const path = require('path');
const homeController = require('../controllers/homeController');
const pagesController = require('../controllers/pagesController');
const apiController = require('../controllers/apiController');
const authRoutes = require('./auth');
const { ensureAuthenticated, ensureAuthenticatedJson } = require('../middleware/auth');

const router = Router();

router.use('/auth', authRoutes);

router.get('/', (req, res) => { return req.user ? res.redirect('/dashboard') : res.redirect('/auth/login'); });
router.get('/messages', homeController.messages);
router.get('/dashboard', ensureAuthenticated, homeController.dashboard);

// SPA routes
const sendSpa = (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
router.get('/orders', ensureAuthenticated, sendSpa);
router.get('/riders', ensureAuthenticated, sendSpa);
router.get('/riders/:id', ensureAuthenticated, sendSpa);
router.get('/reports', ensureAuthenticated, sendSpa);

// Keep customers SSR for now
router.get('/customers', ensureAuthenticated, pagesController.customers);

// API routes
router.get('/api/riders', ensureAuthenticatedJson, apiController.riders);
router.get('/api/riders/:id', ensureAuthenticatedJson, apiController.riderProfile);
router.get('/api/orders', ensureAuthenticatedJson, apiController.orders);
router.get('/api/reports', ensureAuthenticatedJson, apiController.reports);

module.exports = router;
