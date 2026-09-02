import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { ProductGallery } from '../components/ProductGallery';
import { ProductInfo } from '../components/ProductInfo';
import { VariantSelector } from '../components/VariantSelector';
import { EMIPlanList } from '../components/EMIPlanList';
import { ProceedModal } from '../components/ProceedModal';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorState } from '../components/ErrorState';
import { ChevronRight, Home, ShieldCheck } from 'lucide-react';

export const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    product,
    selectedVariant,
    emiPlans,
    selectedEmiPlan,
    setSelectedEmiPlan,
    loading,
    emiLoading,
    error,
    refetch,
    availableStorages,
    availableColors,
    handleSelectStorage,
    handleSelectColor,
    isProceedModalOpen,
    setIsProceedModalOpen,
  } = useProduct(slug);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !product || !selectedVariant) {
    return (
      <ErrorState
        title="Product Not Found"
        message={
          error ||
          `We couldn't find any smartphone matching '${slug}'. Please check the URL or browse our other flagship devices.`
        }
        onRetry={refetch}
        showHomeButton={true}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600 flex items-center space-x-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          to={`/${product.category.toLowerCase()}`}
          className="hover:text-blue-600 transition-colors"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Grid: Left Gallery | Right Product Info & EMI Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Gallery & Visual Highlights */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-6">
          <ProductGallery
            images={selectedVariant.images}
            productName={product.name}
            isNew={product.isNew}
          />

          {/* Mutual Fund Trust Badge Box */}
          <div className="hidden lg:flex items-center space-x-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 text-xs text-blue-900 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900">100% Capital Preservation</div>
              <div className="text-slate-600 mt-0.5">
                Mutual funds remain in your name with full dividend & compounding growth benefits.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Info, Variant Switcher, and EMI Plans */}
        <div className="lg:col-span-6 space-y-6">
          {/* Product Header & Pricing */}
          <ProductInfo
            productName={product.name}
            brand={product.brand}
            storage={selectedVariant.storage}
            colorName={selectedVariant.colorName}
            price={selectedVariant.price}
            mrp={selectedVariant.mrp}
            discountPercentage={selectedVariant.discountPercentage}
          />

          {/* Interactive Variant Selector (Storage & Color) */}
          <VariantSelector
            availableStorages={availableStorages}
            selectedStorage={selectedVariant.storage}
            onSelectStorage={handleSelectStorage}
            availableColors={availableColors}
            selectedColorName={selectedVariant.colorName}
            onSelectColor={handleSelectColor}
          />

          {/* EMI Plans Section */}
          <EMIPlanList
            plans={emiPlans}
            selectedPlan={selectedEmiPlan}
            onSelectPlan={setSelectedEmiPlan}
            onProceed={() => setIsProceedModalOpen(true)}
            loading={emiLoading}
          />
        </div>
      </div>

      {/* Proceed Loan Confirmation Modal */}
      {selectedEmiPlan && (
        <ProceedModal
          isOpen={isProceedModalOpen}
          onClose={() => setIsProceedModalOpen(false)}
          productName={product.name}
          variant={selectedVariant}
          plan={selectedEmiPlan}
        />
      )}
    </div>
  );
};
