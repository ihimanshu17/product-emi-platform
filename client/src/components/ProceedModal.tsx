import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IProductVariant } from '../types/product';
import { IEMIPlan, IProceedOrderResponse } from '../types/emi';
import { productService } from '../services/productService';
import { formatCurrencyINR } from '../utils/formatters';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Loader2,
  AlertCircle,
  Lock,
} from 'lucide-react';

interface ProceedModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  variant: IProductVariant;
  plan: IEMIPlan;
}

export const ProceedModal: React.FC<ProceedModalProps> = ({
  isOpen,
  onClose,
  productName,
  variant,
  plan,
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<IProceedOrderResponse | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const totalPayable = plan.monthlyPayment * plan.tenureMonths;
  const netEffectiveCost = totalPayable - (plan.cashback || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.customerName.trim() || formData.customerName.length < 2) {
      setError('Please enter a valid full name (at least 2 characters)');
      return;
    }
    if (!/^\d{10}$/.test(formData.customerPhone.trim())) {
      setError('Please enter a valid 10-digit mobile phone number');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await productService.proceedOrder({
        variantId: variant.id,
        tenureMonths: plan.tenureMonths,
        customerName: formData.customerName.trim(),
        customerPhone: formData.customerPhone.trim(),
        customerEmail: formData.customerEmail.trim(),
      });
      setSuccessData(res);
    } catch (err: any) {
      setError(err.message || 'Failed to submit loan application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessData(null);
    setError(null);
    setFormData({ customerName: '', customerPhone: '', customerEmail: '' });
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              1Fi
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {successData ? 'Application Confirmed' : 'Confirm EMI Plan'}
              </h3>
              <p className="text-xs text-slate-500">Mutual Fund Backed Financing</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {successData ? (
            /* SUCCESS STATE */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                  Application Reference: {successData.order.orderNumber}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  EMI Plan Selected Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Your mutual fund lien request has been initiated. Zero capital gains tax and no redemption needed!
                </p>
              </div>

              {/* Order summary card */}
              <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-200/80 space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between font-semibold text-slate-800 pb-2 border-b border-slate-200">
                  <span>Product:</span>
                  <span>
                    {productName} ({variant.storage} - {variant.colorName})
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Monthly EMI:</span>
                  <span className="font-bold text-slate-900">
                    {formatCurrencyINR(successData.order.monthlyPayment)} / month
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tenure:</span>
                  <span>{successData.order.tenureMonths} Months</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Interest Rate:</span>
                  <span className="text-emerald-700 font-semibold">
                    {successData.order.interestRate}%
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Cashback Credited:</span>
                  <span className="text-emerald-700 font-bold">
                    {formatCurrencyINR(successData.order.cashback)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200 text-sm">
                  <span>Total Payable:</span>
                  <span>{formatCurrencyINR(successData.order.totalPayable)}</span>
                </div>
              </div>

              <div className="bg-blue-50/80 p-3.5 rounded-xl border border-blue-200/60 text-xs text-blue-900 flex items-center space-x-2.5 text-left">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                <span>
                  Our representative will contact you on <strong>{successData.order.customerPhone}</strong> within 15 minutes to complete OTP verification.
                </span>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Done & Return to Product
              </button>
            </div>
          ) : (
            /* FORM & BREAKDOWN STATE */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Product and Loan Snapshot */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div className="font-bold text-slate-900">{productName}</div>
                  <div className="text-xs font-semibold text-slate-500">
                    {variant.storage} • {variant.colorName}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                  <div>
                    <span className="text-slate-500 block">Device Price:</span>
                    <span className="font-semibold text-slate-900">{formatCurrencyINR(variant.price)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Selected Tenure:</span>
                    <span className="font-semibold text-slate-900">{plan.tenureMonths} Months</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Monthly Payment:</span>
                    <span className="font-bold text-blue-700">{formatCurrencyINR(plan.monthlyPayment)}/mo</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Interest Rate:</span>
                    <span className="font-semibold text-emerald-700">{plan.interestRate}% Interest</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Additional Cashback:</span>
                    <span className="font-semibold text-emerald-700">-{formatCurrencyINR(plan.cashback)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Net Effective Cost:</span>
                    <span className="font-extrabold text-slate-900">{formatCurrencyINR(netEffectiveCost)}</span>
                  </div>
                </div>
              </div>

              {/* Mutual Fund Pledge Note */}
              <div className="flex items-start space-x-2.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200/70 text-xs text-emerald-900">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Zero Liquidations:</strong> Your mutual funds remain invested in your portfolio, generating returns while backing this zero-cost EMI.
                </div>
              </div>

              {/* Customer Details Form */}
              <div className="space-y-3.5 pt-1">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Borrower Information
                </h4>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Full Name (as per PAN / Bank records)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Mobile Number (for OTP verification)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-xs font-semibold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={formData.customerPhone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            customerPhone: e.target.value.replace(/\D/g, ''),
                          })
                        }
                        className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-sm shadow-md flex items-center space-x-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing Application...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirm & Pledge Mutual Funds</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
