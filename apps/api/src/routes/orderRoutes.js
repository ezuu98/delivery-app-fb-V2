import { Router } from 'express';
import { getOrders, postOrder, patchAssign, patchStatus } from '../controllers/orderController.js';

const router = Router();
router.get('/', getOrders);
router.post('/', postOrder);
router.patch('/:id/assign', patchAssign);
router.patch('/:id/status', patchStatus);

export default router;
