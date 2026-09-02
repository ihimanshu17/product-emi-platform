import React from 'react';
import { IEMIPlan } from '../types/emi';
import { EMIPlanCard } from './EMIPlanCard';
import { TrendingUp, ArrowRight, Info, ShieldCheck } from 'lucide-react';
import { formatCurrencyINR } from '../utils/formatters';

interface EMIPlanListProps {
  plans: IEMIPlan[];
  selectedPlan: IEMIPlan | null;
  onSelectPlan: (plan: IEMIPlan) => void;
  onProceed: () => void;
  loading?: boolean;
}

export const EMIPlanList: React.FC<EMIPlanListProps> = ({
  plans,
  selectedPlan,
  onSelectPlan,
  onProceed,
  loading = false,
}) => {
  return (
    <div className="space-y-5">
      {/* Header Section */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-950 tracking-tight">
            Mutual Fund Backed EMI Plans
          </h2>
        </div>
        <p className="text-xs text-slate-500 mt-1.5 flex items-center space-x-1.5 leading-relaxed">
          <TrendingUp className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Keep your mutual fund portfolio compounding while unlocking 0% interest monthly payments.</span>
        </p>
      </div>

      {/* Plan Cards List */}
      {loading ? (
        <div className="space-y-3 py-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-100 animate-pulse rounded-2xl border border-slate-200"
            />
          ))}
        </div>
      ) : plans.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No EMI plans available for this variant</p>
          <p className="text-xs text-slate-500 mt-1">Please select another storage or color option</p>
        </div>
      ) : (
        <div className="space-y-3" role="radiogroup" aria-label="Available EMI Plans">
          {plans.map((plan) => (
            <EMIPlanCard
              key={plan.id || plan.tenureMonths}
              plan={plan}
              isSelected={selectedPlan?.tenureMonths === plan.tenureMonths}
              onSelect={onSelectPlan}
            />
          ))}
        </div>
      )}

      {/* Bottom Sticky Action Bar with Loan Summary */}
      {selectedPlan && (
        <div className="pt-2 sticky bottom-4 z-20">
          <div className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Selected EMI Breakdown
              </div>
              <div className="text-base sm:text-lg font-black text-slate-950 flex items-center space-x-2 mt-0.5">
                <span>{formatCurrencyINR(selectedPlan.monthlyPayment)} / month</span>
                <span className="text-slate-400 text-sm font-normal">for {selectedPlan.tenureMonths} mos</span>
                {selectedPlan.interestRate === 0 && (
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300/80">
                    0% Interest
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onProceed}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200 flex items-center justify-center space-x-2 shrink-0 group active:scale-[0.98] cursor-pointer"
            >
              <span>Proceed with Selected Plan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
