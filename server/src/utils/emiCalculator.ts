import { IEMICalculationResult } from '../types';
export { calculateDiscountPercentage, formatCurrencyINR } from './formatters';

/**
 * Calculates the monthly EMI amount for a given principal, annual interest rate, and tenure.
 * 
 * Formula for reducing balance interest:
 * EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * where:
 *   P = Principal amount
 *   r = Monthly interest rate = (Annual Rate / 12 / 100)
 *   n = Tenure in months
 * 
 * For 0% interest:
 * EMI = P / n
 */
export function calculateMonthlyEMI(principal: number, annualInterestRate: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) {
    return 0;
  }

  if (annualInterestRate === 0) {
    return Math.round(principal / tenureMonths);
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);

  return Math.round(emi);
}

/**
 * Standard tenure configurations for product EMI plans.
 */
export const STANDARD_TENURE_CONFIGS = [
  { tenureMonths: 3, interestRate: 0.0, cashback: 7500, isPopular: false },
  { tenureMonths: 6, interestRate: 0.0, cashback: 7500, isPopular: true },
  { tenureMonths: 12, interestRate: 0.0, cashback: 7500, isPopular: true },
  { tenureMonths: 24, interestRate: 0.0, cashback: 7500, isPopular: false },
  { tenureMonths: 36, interestRate: 10.5, cashback: 7500, isPopular: false },
  { tenureMonths: 48, interestRate: 10.5, cashback: 7500, isPopular: false },
  { tenureMonths: 60, interestRate: 10.5, cashback: 7500, isPopular: false },
];

/**
 * Generates complete actuarial calculations for a list of tenure configurations.
 */
export function generateEMIPlansForPrincipal(
  principal: number,
  customConfigs = STANDARD_TENURE_CONFIGS
): IEMICalculationResult[] {
  return customConfigs.map((config) => {
    const monthlyPayment = calculateMonthlyEMI(principal, config.interestRate, config.tenureMonths);
    const totalPayable = monthlyPayment * config.tenureMonths;
    const totalInterest = config.interestRate === 0 ? 0 : Math.max(0, totalPayable - principal);
    const cashback = Math.min(config.cashback, totalPayable);
    const netEffectiveCost = totalPayable - cashback;

    return {
      tenureMonths: config.tenureMonths,
      interestRate: config.interestRate,
      monthlyPayment,
      principal,
      totalPayable,
      totalInterest,
      cashback,
      netEffectiveCost,
      isPopular: config.isPopular ?? false,
    };
  });
}
