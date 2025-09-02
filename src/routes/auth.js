const { Router } = require('express');
const authController = require('../controllers/firebaseAuthController');

const router = Router();

router.get('/login', authController.showLogin);
router.get('/register', authController.showRegister);
router.post('/session', authController.sessionLogin);
router.post('/logout', authController.logout);

module.exports = router;
