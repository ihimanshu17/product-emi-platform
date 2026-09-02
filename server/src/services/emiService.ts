import { dbService } from './db';
import { IEMIPlan, IEMICalculationResult } from '../types';
import { calculateMonthlyEMI, generateEMIPlansForPrincipal } from '../utils/emiCalculator';

export class EMIService {
  async getEMIPlansForVariant(variantId: string): Promise<IEMIPlan[]> {
    if (!variantId) return [];
    return dbService.getEMIPlansForVariant(variantId);
  }

  async calculateCustomEMI(principal: number, annualInterestRate: number, tenureMonths: number): Promise<IEMICalculationResult> {
    const monthlyPayment = calculateMonthlyEMI(principal, annualInterestRate, tenureMonths);
    const totalPayable = monthlyPayment * tenureMonths;
    const totalInterest = Math.max(0, totalPayable - principal);
    const cashback = 7500;
    const netEffectiveCost = totalPayable - cashback;

    return {
      tenureMonths,
      interestRate: annualInterestRate,
      monthlyPayment,
      principal,
      totalPayable,
      totalInterest,
      cashback,
      netEffectiveCost,
      isPopular: tenureMonths === 6 || tenureMonths === 12,
    };
  }

  calculatePlansForAmount(principal: number): IEMICalculationResult[] {
    return generateEMIPlansForPrincipal(principal);
  }
}

export const emiService = new EMIService();
