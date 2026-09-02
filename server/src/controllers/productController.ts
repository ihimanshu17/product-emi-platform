import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/productService';
import { emiService } from '../services/emiService';
import { sendSuccess, sendError } from '../utils/responseHandler';

export class ProductController {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAllProducts();
      return sendSuccess(res, products, 'Products retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getProductBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = String(req.params.slug);
      const product = await productService.getProductBySlug(slug);

      if (!product) {
        return sendError(res, `Product with slug '${slug}' not found`, 404);
      }

      return sendSuccess(res, product, 'Product details retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  async getProductEMIPlans(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = String(req.params.slug);
      const { variantId } = req.query;

      const product = await productService.getProductBySlug(slug);
      if (!product) {
        return sendError(res, `Product with slug '${slug}' not found`, 404);
      }

      let targetVariant = product.variants[0];
      if (variantId) {
        const found = product.variants.find((v) => v.id === String(variantId));
        if (found) {
          targetVariant = found;
        }
      }

      if (!targetVariant) {
        return sendError(res, 'No variant available for this product', 404);
      }

      const emiPlans = await emiService.getEMIPlansForVariant(targetVariant.id);
      return sendSuccess(
        res,
        {
          productId: product.id,
          productName: product.name,
          variant: {
            id: targetVariant.id,
            storage: targetVariant.storage,
            colorName: targetVariant.colorName,
            price: targetVariant.price,
            mrp: targetVariant.mrp,
          },
          emiPlans,
        },
        'EMI plans retrieved successfully'
      );
    } catch (error) {
      next(error);
    }
  }
}

export const productController = new ProductController();
