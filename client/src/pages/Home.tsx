import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { formatCurrencyINR } from '../utils/formatters';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Gift,
  Layers,
  Smartphone,
  ShieldCheck,
  Zap,
  Lock,
  Percent,
  Calendar,
  Check,
  ChevronRight,
  ArrowUpRight,
  HelpCircle,
  PiggyBank,
} from 'lucide-react';
import { ErrorState } from '../components/ErrorState';

export const Home: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();

  // Interactive EMI Simulator state
  const [simulatorAmount, setSimulatorAmount] = useState(134900); // Default to iPhone 17 Pro
  const [simulatorTenure, setSimulatorTenure] = useState(24); // 24 months 0%

  // Calculations for interactive widget
  const monthlyEmi = Math.round(simulatorAmount / simulatorTenure);
  // Estimated MF return at ~12% annualized return over tenure
  const estimatedReturns = Math.round(
    simulatorAmount * Math.pow(1 + 0.12, simulatorTenure / 12) - simulatorAmount
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="h-12 bg-slate-200/80 rounded-2xl w-72 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-slate-200/60 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState title="Failed to Load Products" message={error} onRetry={refetch} />;
  }

  // Hero composition phones
  const iphoneProduct = products.find((p) => p.slug === 'iphone-17-pro') || products[0];
  const vivoProduct = products.find((p) => p.slug === 'vivo-x300-ultra') || products[1];
  const oneplusProduct = products.find((p) => p.slug === 'oneplus-12') || products[2];

  const getProductImage = (prod?: typeof products[0]) => {
    if (!prod) return '';
    const def = prod.variants.find((v) => v.isDefault) || prod.variants[0];
    return def?.images?.find((img) => img.isPrimary)?.url || def?.images?.[0]?.url || '';
  };

  return (
    <div className="space-y-20 sm:space-y-28 pb-24 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. PREMIUM HERO SECTION                                                  */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-slate-200/50">
        {/* Subtle decorative background orbs & grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-400/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[350px] bg-indigo-400/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Hero Copy & Value Props */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Tag */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Next-Gen Smartphone Financing</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
                Own Flagship Smartphones on{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600">
                  0% EMI
                </span>{' '}
                Backed by Mutual Funds.
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Never liquidate your mutual funds for electronics. Pledge your portfolio as collateral, continue earning market compounding returns, and get instant smartphone deliveries with zero cost.
              </p>

              {/* Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#phones"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200 active:scale-[0.98] group"
                >
                  <span>Explore Phones</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-semibold text-base border border-slate-200 shadow-xs transition-colors duration-200"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>How 1Fi Works</span>
                </a>
              </div>

              {/* 4 Trust Badges */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
                    <Percent className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">0% Interest</div>
                    <div className="text-[11px] text-slate-500">Up to 24 Months</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200/60">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">MF Compounding</div>
                    <div className="text-[11px] text-slate-500">Zero Liquidation</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-200/60">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Flexible Tenure</div>
                    <div className="text-[11px] text-slate-500">3 to 60 Months</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200/60">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">100% Secure</div>
                    <div className="text-[11px] text-slate-500">RBI Regulated</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Floating Smartphone Composition */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
                {/* Glowing backdrop aura */}
                <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-emerald-400/15 blur-2xl -z-10" />

                {/* Secondary Phone Left (OnePlus 12) */}
                {oneplusProduct && (
                  <div className="absolute -left-6 top-8 w-44 sm:w-52 aspect-[3/4] rounded-2xl bg-white/70 backdrop-blur-md p-3 border border-slate-200/80 shadow-fintech animate-float-delayed z-10 transition-transform hover:scale-105">
                    <img
                      src={getProductImage(oneplusProduct)}
                      alt={oneplusProduct.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products/oneplus-12/silkyblack1.png';
                      }}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-bold text-center">
                      OnePlus 12 5G
                    </div>
                  </div>
                )}

                {/* Primary Hero Centerpiece (iPhone 17 Pro) */}
                {iphoneProduct && (
                  <div className="relative w-56 sm:w-64 aspect-[3/4] rounded-3xl bg-white p-4 border border-slate-200/90 shadow-fintech-hover animate-float-slow z-20">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm flex items-center space-x-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>Featured 0% EMI</span>
                    </div>
                    <img
                      src={getProductImage(iphoneProduct)}
                      alt={iphoneProduct.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products/iphone-17-pro/silver1.png';
                      }}
                      className="w-full h-full object-contain scale-110 drop-shadow-xl"
                    />
                    <div className="mt-1 text-center">
                      <div className="text-xs font-extrabold text-slate-900">{iphoneProduct.name}</div>
                      <div className="text-[11px] font-bold text-blue-600">0% EMI from ₹5,621/mo</div>
                    </div>
                  </div>
                )}

                {/* Secondary Phone Right (vivo X300 Ultra) */}
                {vivoProduct && (
                  <div className="absolute -right-6 bottom-6 w-44 sm:w-52 aspect-[3/4] rounded-2xl bg-white/70 backdrop-blur-md p-3 border border-slate-200/80 shadow-fintech animate-float-slow z-10 transition-transform hover:scale-105">
                    <img
                      src={getProductImage(vivoProduct)}
                      alt={vivoProduct.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/products/vivo-x300-ultra/eclipseblack1.png';
                      }}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 backdrop-blur-md text-white px-2 py-1 rounded-lg text-[10px] font-bold text-center">
                      vivo X300 Ultra
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PRODUCT SHOWCASE (3 PHONES)                                           */}
      {/* ========================================================================= */}
      <section id="phones" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider border border-blue-200/60">
            <Smartphone className="w-3.5 h-3.5 text-blue-600" />
            <span>Curated Flagship Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Flagship Smartphones Available on 0% EMI
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            Choose your preferred flagship device, customize storage and finish, and unlock guaranteed zero-interest tenures.
          </p>
        </div>

        {/* 3-Column Responsive Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const defaultVariant =
              product.variants.find((v) => v.isDefault) || product.variants[0];
            const startingPrice = defaultVariant ? defaultVariant.price : 0;
            const primaryImage =
              defaultVariant?.images?.find((img) => img.isPrimary)?.url ||
              defaultVariant?.images?.[0]?.url ||
              '';

            // Calculate starting monthly EMI for 24 months @ 0%
            const startingMonthlyEmi = startingPrice ? Math.round(startingPrice / 24) : 0;

            // Unique storages and colors
            const uniqueStorages = Array.from(new Set(product.variants.map((v) => v.storage)));
            const uniqueColors = Array.from(
              new Map(product.variants.map((v) => [v.colorName, v])).values()
            );

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-fintech hover:shadow-fintech-hover card-hover-lift flex flex-col overflow-hidden"
              >
                {/* Top Image Showcase Stage */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50/80 to-slate-100/50 p-6 flex items-center justify-center overflow-hidden">
                  {/* Badge: New or Cashback */}
                  <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5">
                    {product.isNew && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-blue-600 text-white uppercase tracking-wider shadow-xs">
                        NEW
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                      ₹7,500 Cashback
                    </span>
                  </div>

                  {/* Device Image with smooth zoom and subtle lift */}
                  <img
                    src={primaryImage}
                    alt={product.name}
                    onError={(e) => {
                      const lower = (product.name || '').toLowerCase();
                      if (lower.includes('vivo') || lower.includes('x300')) {
                        (e.target as HTMLImageElement).src = '/images/products/vivo-x300-ultra/eclipseblack1.png';
                      } else if (lower.includes('oneplus')) {
                        (e.target as HTMLImageElement).src = '/images/products/oneplus-12/silkyblack1.png';
                      } else {
                        (e.target as HTMLImageElement).src = '/images/products/iphone-17-pro/silver1.png';
                      }
                    }}
                    className="w-full h-full object-contain scale-110 transition-transform duration-300 group-hover:scale-120 drop-shadow-md"
                    loading="lazy"
                  />
                </div>

                {/* Card Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    {/* Brand */}
                    <div className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                      {product.brand}
                    </div>

                    {/* Product Title */}
                    <h3 className="text-xl font-black text-slate-950 group-hover:text-blue-600 transition-colors mt-1">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Storages & Colors Badges */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                      {/* Storage Pills */}
                      <div className="flex items-center space-x-1.5">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        <div className="flex items-center space-x-1">
                          {uniqueStorages.map((s) => (
                            <span
                              key={s}
                              className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Color dots preview */}
                      <div className="flex items-center space-x-1.5">
                        {uniqueColors.map((c) => (
                          <span
                            key={c.colorName}
                            className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                            style={{ backgroundColor: c.colorHex }}
                            title={c.colorName}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and EMI Bottom Row */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[11px] text-slate-500 block font-medium">Starting from</span>
                        <span className="text-2xl font-black text-slate-950">
                          {formatCurrencyINR(startingPrice)}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-emerald-700 font-bold block">
                          0% EMI from
                        </span>
                        <span className="text-base font-extrabold text-blue-700">
                          {formatCurrencyINR(startingMonthlyEmi)}/mo
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to={`/products/${product.slug}`}
                      className="w-full py-3.5 rounded-xl bg-slate-950 group-hover:bg-blue-600 text-white font-bold text-sm shadow-xs transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>View Details & EMI Plans</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE EMI VALUE PROPOSITION & WEALTH SIMULATOR                  */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-slate-800">
          {/* Subtle glow elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Value Proposition Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                <PiggyBank className="w-3.5 h-3.5" />
                <span>Wealth Preservation Architecture</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Don’t Break Your Investments.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400">
                  Earn Returns While Paying 0% EMI.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                When you pay cash upfront for a ₹1.35L phone, that capital stops earning. With 1Fi, your mutual fund units remain safely invested in your own name, continuing to earn market growth while you pay convenient 0% EMIs.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>No capital gains tax triggered (zero liquidation)</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Transparent reducing-balance calculations & ₹7,500 cashback</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Instant lien marking via RBI-regulated depositories</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive EMI vs Compounding Simulator */}
            <div className="lg:col-span-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-extrabold text-white">Live EMI & Wealth Simulator</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Test monthly payments vs portfolio compounding</p>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  0% Interest
                </span>
              </div>

              {/* Slider 1: Product Cost */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Smartphone Principal</span>
                  <span className="text-emerald-400 text-sm font-bold">
                    {formatCurrencyINR(simulatorAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="60000"
                  max="160000"
                  step="5000"
                  value={simulatorAmount}
                  onChange={(e) => setSimulatorAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>₹60,000 (OnePlus 12)</span>
                  <span>₹1,50,000 (iPhone 17 Pro)</span>
                  <span>₹1,59,999 (vivo X300 Ultra)</span>
                </div>
              </div>

              {/* Slider 2: Tenure */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Loan Tenure</span>
                  <span className="text-blue-400 text-sm font-bold">{simulatorTenure} Months</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 12, 18, 24].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setSimulatorTenure(t)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${
                        simulatorTenure === t
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {t} Mo
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-time Calculation Result Cards */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60">
                  <span className="text-[11px] text-slate-400 block font-medium">Monthly 0% EMI</span>
                  <span className="text-xl sm:text-2xl font-black text-white mt-1 block">
                    {formatCurrencyINR(monthlyEmi)}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
                    ₹0 Extra Interest
                  </span>
                </div>

                <div className="bg-emerald-950/40 rounded-xl p-4 border border-emerald-500/30">
                  <span className="text-[11px] text-emerald-300 block font-medium">Est. Returns Earned</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1 block">
                    +{formatCurrencyINR(estimatedReturns)}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-semibold mt-1 block">
                    Portfolio kept growing @ ~12%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. "HOW 1FI WORKS" 4-STEP PROGRESSIVE WORKFLOW                           */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider border border-blue-200/60">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Seamless Digital Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            How 1Fi Works in 4 Simple Steps
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            From picking your dream smartphone to doorstep delivery in less than 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <div className="relative bg-white rounded-3xl p-6 border border-slate-200/80 shadow-fintech space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 font-black text-lg flex items-center justify-center border border-blue-200/60 shadow-xs">
              01
            </div>
            <h3 className="text-lg font-black text-slate-900">Choose Smartphone</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Explore iPhone 17 Pro, vivo X300 Ultra, or OnePlus 12 5G with verified manufacturer warranties.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative bg-white rounded-3xl p-6 border border-slate-200/80 shadow-fintech space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 font-black text-lg flex items-center justify-center border border-indigo-200/60 shadow-xs">
              02
            </div>
            <h3 className="text-lg font-black text-slate-900">Select Color & Storage</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Configure storage size and authentic finish. Pricing and gallery dynamically update instantly.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative bg-white rounded-3xl p-6 border border-slate-200/80 shadow-fintech space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 font-black text-lg flex items-center justify-center border border-purple-200/60 shadow-xs">
              03
            </div>
            <h3 className="text-lg font-black text-slate-900">Pledge MF & Pick Tenure</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Pledge your mutual fund portfolio digitally. Choose 3 to 24 months 0% EMI with ₹7,500 direct cashback.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative bg-white rounded-3xl p-6 border border-slate-200/80 shadow-fintech space-y-4 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 font-black text-lg flex items-center justify-center border border-emerald-200/60 shadow-xs">
              04
            </div>
            <h3 className="text-lg font-black text-slate-900">Doorstep Delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Instant digital loan agreement generation. Phone is dispatched with free express delivery.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TRUST & SECURITY SECTION                                              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-8 sm:p-12 lg:p-16">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Institutional Safety</span>
            </div>
            <h2 className="text-3xl font-black text-slate-950 tracking-tight">
              Bank-Grade Security at Every Step
            </h2>
            <p className="text-sm text-slate-600 font-normal">
              Regulated infrastructure ensuring your mutual funds remain 100% under your ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">RBI Regulated NBFCs</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All credit facilities are powered exclusively by Reserve Bank of India approved and regulated NBFC partners.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">256-Bit Bank Encryption</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your personal details, contact data, and financial identifiers are secured using AES-256 end-to-end encryption.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">SEBI Registered Depositories</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mutual fund lien marking is processed securely via CAMS & KFintech without transferring fund ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL HIGH-CONVERSION CTA SECTION                                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white p-10 sm:p-14 text-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Your next smartphone, made easier.
            </h2>
            <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
              Join thousands of smart investors using mutual fund backed 0% EMIs. No down payments, zero extra cost, and guaranteed authentic devices.
            </p>

            <div className="pt-2">
              <a
                href="#phones"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-base shadow-lg transition-all duration-200 active:scale-95 group"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
