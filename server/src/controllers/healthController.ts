import { Request, Response } from 'express';
import { dbService } from '../services/db';
import { sendSuccess } from '../utils/responseHandler';

export class HealthController {
  async getHealth(req: Request, res: Response) {
    const health = await dbService.isHealthy();
    return sendSuccess(
      res,
      {
        status: 'UP',
        service: '1Fi Product EMI API',
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        database: health.dbConnected ? 'PostgreSQL (Connected)' : 'In-Memory Relational Engine',
        totalProductsAvailable: health.totalProducts,
      },
      'Service is operational'
    );
  }
}

export const healthController = new HealthController();
