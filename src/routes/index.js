const { Router } = require('express');
const homeController = require('../controllers/homeController');
const pagesController = require('../controllers/pagesController');
const authRoutes = require('./auth');
const { ensureAuthenticated } = require('../middleware/auth');

const router = Router();

router.use('/auth', authRoutes);

router.get('/', (req, res) => { return req.user ? res.redirect('/dashboard') : res.redirect('/auth/login'); });
router.get('/messages', homeController.messages);
router.get('/dashboard', ensureAuthenticated, homeController.dashboard);
router.get('/orders', ensureAuthenticated, pagesController.orders);
router.get('/riders', ensureAuthenticated, pagesController.riders);
router.get('/customers', ensureAuthenticated, pagesController.customers);
router.get('/reports', ensureAuthenticated, pagesController.reports);

module.exports = router;
