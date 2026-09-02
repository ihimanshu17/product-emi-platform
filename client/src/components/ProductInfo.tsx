import React from 'react';
import { formatCurrencyINR } from '../utils/formatters';
import { Tag } from 'lucide-react';

interface ProductInfoProps {
  productName: string;
  brand: string;
  storage: string;
  colorName: string;
  price: number;
  mrp: number;
  discountPercentage?: number;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  productName,
  brand,
  storage,
  colorName,
  price,
  mrp,
  discountPercentage,
}) => {
  const discount = discountPercentage || (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);

  return (
    <div className="space-y-4">
      {/* Title & Brand */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-blue-600 tracking-wide uppercase">
          <span>{brand}</span>
          <span>•</span>
          <span>Flagship Series</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          {productName}
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1">
          {storage} • {colorName}
        </p>
      </div>

      {/* Pricing Header */}
      <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/60">
        <div className="flex items-baseline space-x-3">
          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {formatCurrencyINR(price)}
          </span>
          {mrp > price && (
            <span className="text-lg text-slate-400 line-through font-medium">
              {formatCurrencyINR(mrp)}
            </span>
          )}
          {discount > 0 && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <Tag className="w-3 h-3" />
              <span>{discount}% OFF</span>
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1 flex items-center space-x-1.5">
          <span>Inclusive of all taxes & insurance</span>
          <span>•</span>
          <span className="text-emerald-600 font-semibold">Free Express Delivery</span>
        </p>
      </div>
    </div>
  );
};
