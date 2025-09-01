import { Router } from 'express';
import { getRiders } from '../controllers/riderController.js';

const router = Router();
router.get('/', getRiders);

export default router;
