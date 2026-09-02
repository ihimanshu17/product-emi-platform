import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/orderService';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { z } from 'zod';

export const proceedOrderSchema = z.object({
  variantId: z.string().min(1, 'variantId is required'),
  tenureMonths: z.number().int().positive('tenureMonths must be positive integer'),
  customerName: z.string().min(2, 'customerName must be at least 2 characters'),
  customerPhone: z.string().min(10, 'customerPhone must be at least 10 digits'),
  customerEmail: z.string().email('Invalid email address'),
});

export class OrderController {
  async proceedOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await orderService.processProceed(req.body);
      return sendSuccess(
        res,
        result,
        'EMI plan application processed and confirmed successfully',
        201
      );
    } catch (error: any) {
      if (error.message === 'Product variant not found') {
        return sendError(res, error.message, 404);
      }
      next(error);
    }
  }
}

export const orderController = new OrderController();
