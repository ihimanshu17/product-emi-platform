import { Request, Response, NextFunction } from 'express';
import { emiService } from '../services/emiService';
import { sendSuccess, sendError } from '../utils/responseHandler';
import { z } from 'zod';

export const calculateEMISchema = z.object({
  principal: z.number().positive('Principal amount must be greater than 0'),
  annualInterestRate: z.number().min(0, 'Interest rate cannot be negative'),
  tenureMonths: z.number().int().positive('Tenure must be a positive integer'),
});

export const getPlansForAmountSchema = z.object({
  amount: z.coerce.number().positive('Amount must be greater than 0'),
});

export class EMIController {
  async calculateEMI(req: Request, res: Response, next: NextFunction) {
    try {
      const { principal, annualInterestRate, tenureMonths } = req.body;
      const result = await emiService.calculateCustomEMI(principal, annualInterestRate, tenureMonths);
      return sendSuccess(res, result, 'EMI calculation completed');
    } catch (error) {
      next(error);
    }
  }

  async getPlansForAmount(req: Request, res: Response, next: NextFunction) {
    try {
      const amount = Number(req.query.amount);
      if (!amount || isNaN(amount) || amount <= 0) {
        return sendError(res, 'Valid amount query parameter is required', 400);
      }

      const plans = emiService.calculatePlansForAmount(amount);
      return sendSuccess(res, plans, 'EMI plans generated successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const emiController = new EMIController();
