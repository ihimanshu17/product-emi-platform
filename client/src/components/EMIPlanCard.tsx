import React from 'react';
import { IEMIPlan } from '../types/emi';
import { formatCurrencyINR } from '../utils/formatters';
import { Gift, CheckCircle2, Circle, Sparkles, Percent } from 'lucide-react';

interface EMIPlanCardProps {
  plan: IEMIPlan;
  isSelected: boolean;
  onSelect: (plan: IEMIPlan) => void;
}

export const EMIPlanCard: React.FC<EMIPlanCardProps> = ({ plan, isSelected, onSelect }) => {
  const isZeroPercent = plan.interestRate === 0;

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(plan)}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onSelect(plan);
        }
      }}
      className={`relative cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-200 border-2 select-none ${
        isSelected
          ? 'bg-blue-50/70 border-blue-600 shadow-sm ring-2 ring-blue-100 scale-[1.01]'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
      }`}
    >
      {/* Popular plan indicator */}
      {plan.isPopular && (
        <div className="absolute -top-2.5 right-4">
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs uppercase tracking-wider">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Most Popular</span>
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        {/* Left: Radio and Calculation Info */}
        <div className="flex items-start space-x-3.5">
          <div className="mt-0.5 text-blue-600 shrink-0">
            {isSelected ? (
              <CheckCircle2 className="w-5 h-5 fill-blue-600 text-white" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300" />
            )}
          </div>

          <div>
            {/* Primary line: Monthly EMI x Tenure */}
            <div className="flex items-baseline space-x-2 flex-wrap">
              <span className="text-lg sm:text-xl font-black text-slate-950 tracking-tight">
                {formatCurrencyINR(plan.monthlyPayment)}
              </span>
              <span className="text-sm font-bold text-slate-600">
                x {plan.tenureMonths} months
              </span>
            </div>

            {/* Secondary line: Cashback & Mutual Fund Protection */}
            {plan.cashback > 0 && (
              <div className="mt-2 flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit border border-emerald-200/70">
                <Gift className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Direct Cashback of {formatCurrencyINR(plan.cashback)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interest Rate Badge */}
        <div className="shrink-0 text-right">
          <span
            className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-extrabold ${
              isZeroPercent
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300/80 shadow-2xs'
                : 'bg-slate-100 text-slate-800 border border-slate-200'
            }`}
          >
            {isZeroPercent && <Percent className="w-3 h-3 text-emerald-700" />}
            <span>{plan.interestRate}% interest</span>
          </span>
          {isZeroPercent && (
            <p className="text-[10px] text-emerald-700 font-bold mt-1">Zero Extra Cost</p>
          )}
        </div>
      </div>
    </div>
  );
};
