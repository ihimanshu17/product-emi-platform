import { Router } from 'express';
import { variantController } from '../controllers/variantController';

const router = Router();

// GET /api/variants/:variantId - Get full variant information
router.get('/:variantId', (req, res, next) => variantController.getVariantById(req, res, next));

export default router;
