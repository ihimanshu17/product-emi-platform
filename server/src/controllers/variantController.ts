import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/productService';
import { emiService } from '../services/emiService';
import { sendSuccess, sendError } from '../utils/responseHandler';

export class VariantController {
  async getVariantById(req: Request, res: Response, next: NextFunction) {
    try {
      const variantId = String(req.params.variantId);
      const variant = await productService.getVariantById(variantId);

      if (!variant) {
        return sendError(res, `Variant with id '${variantId}' not found`, 404);
      }

      // Ensure EMI plans are enriched
      if (!variant.emiPlans || variant.emiPlans.length === 0) {
        variant.emiPlans = await emiService.getEMIPlansForVariant(variant.id);
      }

      return sendSuccess(res, variant, 'Variant details retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const variantController = new VariantController();
