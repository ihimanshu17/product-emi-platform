import {
  calculateMonthlyEMI,
  generateEMIPlansForPrincipal,
  STANDARD_TENURE_CONFIGS,
} from '../src/utils/emiCalculator';
import { calculateDiscountPercentage, formatCurrencyINR } from '../src/utils/formatters';

describe('EMI Calculator Utility Tests', () => {
  describe('calculateMonthlyEMI', () => {
    it('should correctly calculate 0% interest monthly payment for standard tenures', () => {
      const principal = 120000;
      expect(calculateMonthlyEMI(principal, 0, 3)).toBe(40000);
      expect(calculateMonthlyEMI(principal, 0, 6)).toBe(20000);
      expect(calculateMonthlyEMI(principal, 0, 12)).toBe(10000);
      expect(calculateMonthlyEMI(principal, 0, 24)).toBe(5000);
    });

    it('should correctly calculate reducing balance EMI for 10.5% interest rate', () => {
      const principal = 127400;
      const rate = 10.5;

      // 36 months @ 10.5%:
      // r = 10.5 / 12 / 100 = 0.00875
      // factor = (1 + 0.00875)^36 = 1.3685
      // EMI = 127400 * 0.00875 * 1.3685 / 0.3685 ≈ 4142
      const emi36 = calculateMonthlyEMI(principal, rate, 36);
      expect(emi36).toBeGreaterThan(4100);
      expect(emi36).toBeLessThan(4200);

      const emi48 = calculateMonthlyEMI(principal, rate, 48);
      expect(emi48).toBeGreaterThan(3200);
      expect(emi48).toBeLessThan(3350);

      const emi60 = calculateMonthlyEMI(principal, rate, 60);
      expect(emi60).toBeGreaterThan(2700);
      expect(emi60).toBeLessThan(2800);
    });

    it('should return 0 when principal or tenure is zero or negative', () => {
      expect(calculateMonthlyEMI(0, 10.5, 12)).toBe(0);
      expect(calculateMonthlyEMI(-50000, 10.5, 12)).toBe(0);
      expect(calculateMonthlyEMI(100000, 10.5, 0)).toBe(0);
      expect(calculateMonthlyEMI(100000, 10.5, -6)).toBe(0);
    });
  });

  describe('generateEMIPlansForPrincipal', () => {
    it('should generate all standard tenure EMI plans with cashback and interest calculations', () => {
      const principal = 127400;
      const plans = generateEMIPlansForPrincipal(principal);

      expect(plans.length).toBe(STANDARD_TENURE_CONFIGS.length);
      expect(plans.length).toBe(7);

      const plan3Months = plans.find((p) => p.tenureMonths === 3);
      expect(plan3Months).toBeDefined();
      expect(plan3Months?.interestRate).toBe(0);
      expect(plan3Months?.cashback).toBe(7500);
      expect(plan3Months?.totalInterest).toBe(0);

      const plan36Months = plans.find((p) => p.tenureMonths === 36);
      expect(plan36Months).toBeDefined();
      expect(plan36Months?.interestRate).toBe(10.5);
      expect(plan36Months?.totalInterest).toBeGreaterThan(0);
      expect(plan36Months?.totalPayable).toBe(plan36Months!.monthlyPayment * 36);
      expect(plan36Months?.netEffectiveCost).toBe(plan36Months!.totalPayable - 7500);
    });
  });

  describe('Formatters Utility', () => {
    it('should calculate discount percentages accurately', () => {
      expect(calculateDiscountPercentage(134900, 127400)).toBe(6);
      expect(calculateDiscountPercentage(100000, 80000)).toBe(20);
      expect(calculateDiscountPercentage(100000, 100000)).toBe(0);
      expect(calculateDiscountPercentage(100000, 120000)).toBe(0);
    });

    it('should format INR currency properly', () => {
      const formatted = formatCurrencyINR(127400);
      expect(formatted).toContain('1,27,400');
    });
  });
});
