import { dbService } from './db';
import { IOrderInput } from '../types';
import { calculateMonthlyEMI } from '../utils/emiCalculator';

export class OrderService {
  async processProceed(input: IOrderInput) {
    const variant = await dbService.getVariantById(input.variantId);
    if (!variant) {
      throw new Error('Product variant not found');
    }

    // Lookup matching EMI plan or compute actuarial values
    const emiPlans = await dbService.getEMIPlansForVariant(input.variantId);
    const matchedPlan = emiPlans.find((p) => p.tenureMonths === input.tenureMonths);

    const interestRate = matchedPlan ? matchedPlan.interestRate : (input.tenureMonths > 24 ? 10.5 : 0.0);
    const cashback = matchedPlan ? matchedPlan.cashback : 7500;
    const monthlyPayment = matchedPlan
      ? matchedPlan.monthlyPayment
      : calculateMonthlyEMI(variant.price, interestRate, input.tenureMonths);
    const totalPayable = monthlyPayment * input.tenureMonths;

    const order = await dbService.createOrder({
      variantId: input.variantId,
      tenureMonths: input.tenureMonths,
      monthlyPayment,
      interestRate,
      cashback,
      totalPayable,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
    });

    return {
      order,
      variant: {
        id: variant.id,
        productId: variant.productId,
        storage: variant.storage,
        colorName: variant.colorName,
        price: variant.price,
        mrp: variant.mrp,
      },
      emiPlan: {
        tenureMonths: input.tenureMonths,
        monthlyPayment,
        interestRate,
        cashback,
        totalPayable,
        totalInterest: Math.max(0, totalPayable - variant.price),
        netEffectiveCost: totalPayable - cashback,
      },
    };
  }
}

export const orderService = new OrderService();
