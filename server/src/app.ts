import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes';
import variantRoutes from './routes/variantRoutes';
import emiRoutes from './routes/emiRoutes';
import orderRoutes from './routes/orderRoutes';
import healthRoutes from './routes/healthRoutes';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

dotenv.config();

export const app: Application = express();

// Security and utility middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// API Index route
app.get(['/', '/api'], (_req, res) => {
  res.json({
    name: '1Fi Product EMI Platform API',
    status: 'online',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      productBySlug: '/api/products/:slug',
      emiPlans: '/api/products/:slug/emi-plans',
      variants: '/api/variants/:variantId',
      proceedOrder: 'POST /api/orders/proceed',
      calculateEmi: '/api/emi/plans?amount=:amount',
    },
  });
});

// API Routes (mounted with both /api and root prefix for maximum proxy / serverless resilience)
const routeList = [
  ['/health', healthRoutes],
  ['/products', productRoutes],
  ['/variants', variantRoutes],
  ['/emi', emiRoutes],
  ['/orders', orderRoutes],
] as const;

for (const [routePath, router] of routeList) {
  app.use(`/api${routePath}`, router);
  app.use(routePath, router);
}

// Catch-all 404 for undefined routes
app.use(notFoundHandler);

// Centralized error handling
app.use(errorHandler);

export default app;
