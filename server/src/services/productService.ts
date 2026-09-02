import { dbService } from './db';
import { IProduct, IProductVariant } from '../types';

export class ProductService {
  async getAllProducts(): Promise<IProduct[]> {
    return dbService.getAllProducts();
  }

  async getProductBySlug(slug: string): Promise<IProduct | null> {
    if (!slug) return null;
    return dbService.getProductBySlug(slug);
  }

  async getVariantById(variantId: string): Promise<IProductVariant | null> {
    if (!variantId) return null;
    return dbService.getVariantById(variantId);
  }
}

export const productService = new ProductService();
