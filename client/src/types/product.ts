import { IEMIPlan } from './emi';

export interface IProductImage {
  id: string;
  variantId: string;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
  order: number;
}

export interface IProductVariant {
  id: string;
  productId: string;
  storage: string;
  colorName: string;
  colorHex: string;
  mrp: number;
  price: number;
  stock: number;
  isDefault: boolean;
  discountPercentage?: number;
  images: IProductImage[];
  emiPlans?: IEMIPlan[];
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description?: string | null;
  category: string;
  isNew: boolean;
  variants: IProductVariant[];
  startingPrice?: number;
  totalVariants?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
  timestamp: string;
}
