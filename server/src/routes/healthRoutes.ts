import { Router } from 'express';
import { healthController } from '../controllers/healthController';

const router = Router();

// GET /api/health
router.get('/', (req, res) => healthController.getHealth(req, res));

export default router;
