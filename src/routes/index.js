const { Router } = require('express');
const homeController = require('../controllers/homeController');
const authRoutes = require('./auth');
const { ensureAuthenticated } = require('../middleware/auth');

const router = Router();

router.use('/auth', authRoutes);

router.get('/', (req, res) => { return req.user ? res.redirect('/dashboard') : res.redirect('/auth/login'); });
router.get('/messages', homeController.messages);
router.get('/dashboard', ensureAuthenticated, homeController.dashboard);

module.exports = router;
