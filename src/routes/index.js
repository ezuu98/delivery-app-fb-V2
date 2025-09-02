const { Router } = require('express');
const homeController = require('../controllers/homeController');

const router = Router();

router.get('/', homeController.index);
router.get('/messages', homeController.messages);

module.exports = router;
