import { Router } from 'express';
import { productController } from '../controllers/productController';

const router = Router();

// GET /api/products - Get all products
router.get('/', (req, res, next) => productController.getAllProducts(req, res, next));

// GET /api/products/:slug - Get single product with all variants
router.get('/:slug', (req, res, next) => productController.getProductBySlug(req, res, next));

// GET /api/products/:slug/emi-plans - Get EMI plans for selected variant
router.get('/:slug/emi-plans', (req, res, next) => productController.getProductEMIPlans(req, res, next));

export default router;
