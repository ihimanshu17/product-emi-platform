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

export interface IProceedOrderPayload {
  variantId: string;
  tenureMonths: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

export interface IProceedOrderResponse {
  order: {
    id: string;
    orderNumber: string;
    variantId: string;
    tenureMonths: number;
    monthlyPayment: number;
    interestRate: number;
    cashback: number;
    totalPayable: number;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    status: string;
    createdAt: string;
  };
  variant: {
    id: string;
    productId: string;
    storage: string;
    colorName: string;
    price: number;
    mrp: number;
  };
  emiPlan: {
    tenureMonths: number;
    monthlyPayment: number;
    interestRate: number;
    cashback: number;
    totalPayable: number;
    totalInterest: number;
    netEffectiveCost: number;
  };
}
