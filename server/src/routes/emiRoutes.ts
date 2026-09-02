import { Router } from 'express';
import { emiController, calculateEMISchema } from '../controllers/emiController';
import { validateBody } from '../middleware/validator';

const router = Router();

// POST /api/emi/calculate - Calculate custom EMI
router.post('/calculate', validateBody(calculateEMISchema), (req, res, next) =>
  emiController.calculateEMI(req, res, next)
);

// GET /api/emi/plans - Get standard EMI plans for amount
router.get('/plans', (req, res, next) => emiController.getPlansForAmount(req, res, next));

export default router;
