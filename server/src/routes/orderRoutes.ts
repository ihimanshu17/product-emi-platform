import { Router } from 'express';
import { orderController, proceedOrderSchema } from '../controllers/orderController';
import { validateBody } from '../middleware/validator';

const router = Router();

// POST /api/orders/proceed - Proceed and simulate loan application
router.post('/proceed', validateBody(proceedOrderSchema), (req, res, next) =>
  orderController.proceedOrder(req, res, next)
);

export default router;
