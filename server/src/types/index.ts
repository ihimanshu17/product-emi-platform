export interface IProductImage {
  id: string;
  variantId: string;
  url: string;
  altText?: string | null;
  isPrimary: boolean;
  order: number;
}

export interface IEMIPlan {
  id: string;
  variantId: string;
  tenureMonths: number;
  interestRate: number;
  monthlyPayment: number;
  cashback: number;
  totalPayable: number;
  totalInterest?: number;
  netEffectiveCost?: number;
  isPopular?: boolean;
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
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface IEMICalculationResult {
  tenureMonths: number;
  interestRate: number;
  monthlyPayment: number;
  principal: number;
  totalPayable: number;
  totalInterest: number;
  cashback: number;
  netEffectiveCost: number;
  isPopular: boolean;
}

export interface IOrderInput {
  variantId: string;
  tenureMonths: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  timestamp: string;
}
