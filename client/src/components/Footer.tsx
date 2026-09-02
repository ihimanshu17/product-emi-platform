import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle2, TrendingUp, Smartphone, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 mt-20">
      {/* Value props banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-900/50 text-blue-400 flex items-center justify-center shrink-0 border border-blue-800/50">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm">Mutual Fund Compounding</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Pledge your portfolio to unlock 0% interest without selling units or stopping your compounding growth.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/50">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm">Direct Cashback of ₹7,500</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Receive direct cashback on eligible smartphone flagship variants across popular EMI tenures.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-900/50 text-purple-400 flex items-center justify-center shrink-0 border border-purple-800/50">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm">Bank-Grade Digital Security</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                End-to-end encryption with RBI-regulated NBFC partners and SEBI registered depositories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg">1Fi</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white leading-none">1Fi Platform</span>
                <span className="text-[10px] font-medium text-blue-400 uppercase mt-0.5 tracking-wider">
                  Mutual Fund Backed EMI
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              1Fi is an innovative fintech financing platform enabling consumers to purchase high-value smartphones with zero down payment and zero interest by pledging their mutual fund investments.
            </p>
          </div>

          {/* Col 2: Flagship Devices */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Flagship Collection
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/products/iphone-17-pro" className="hover:text-blue-400 transition-colors flex items-center space-x-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Apple iPhone 17 Pro</span>
                </Link>
              </li>
              <li>
                <Link to="/products/vivo-x300-ultra" className="hover:text-blue-400 transition-colors flex items-center space-x-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  <span>vivo X300 Ultra</span>
                </Link>
              </li>
              <li>
                <Link to="/products/oneplus-12" className="hover:text-blue-400 transition-colors flex items-center space-x-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  <span>OnePlus 12 5G</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Fintech Disclosures
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>RBI NBFC Lending Standards</li>
              <li>SEBI Lien Marking Guidelines</li>
              <li>Privacy Policy & Data Security</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© {new Date().getFullYear()} 1Fi Technology Private Limited. All rights reserved.</p>
        <p className="mt-2 sm:mt-0 flex items-center space-x-3">
          <span>Mutual Fund investments are subject to market risks.</span>
        </p>
      </div>
    </footer>
  );
};
