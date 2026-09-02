import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IProductImage } from '../types/product';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: IProductImage[];
  productName: string;
  isNew?: boolean;
}

const VIVO_X300_ULTRA_PRODUCT_PHOTOS: Record<string, string> = {
  'eclipse black': '/images/products/vivo-x300-ultra/eclipseblack1.png',
  'victory green': '/images/products/vivo-x300-ultra/victorygreen1.png',
};

const getBrandFallbackImage = (name: string, altText?: string | null) => {
  const lower = (name || '').toLowerCase();
  const alt = (altText || '').toLowerCase();
  if (lower.includes('vivo') || lower.includes('x300')) {
    if (alt.includes('green') || alt.includes('victory')) {
      return VIVO_X300_ULTRA_PRODUCT_PHOTOS['victory green'];
    }
    return VIVO_X300_ULTRA_PRODUCT_PHOTOS['eclipse black'];
  }
  if (lower.includes('oneplus')) return '/images/products/oneplus-12/silkyblack1.png';
  return '/images/products/iphone-17-pro/silver1.png';
};

const resolveImageUrl = (image: IProductImage | null, productName: string) => {
  if (!image || !image.url) return getBrandFallbackImage(productName, image?.altText);
  return image.url;
};

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName, isNew = false }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setHasError(false);
  }, [images]);

  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight' && images.length > 1) setSelectedImageIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft' && images.length > 1) setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, images.length]);

  const activeImage = images?.length > 0 ? images[selectedImageIndex] : null;
  const imageUrl = hasError ? getBrandFallbackImage(productName, activeImage?.altText) : resolveImageUrl(activeImage, productName);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full h-[460px] sm:h-[540px] bg-white rounded-3xl p-2 sm:p-4 flex items-center justify-center border border-slate-200/80 shadow-sm transition-all hover:shadow-md overflow-hidden group">
        {isNew && <div className="absolute top-5 left-5 z-10"><span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200 tracking-wide uppercase shadow-xs">NEW</span></div>}
        <div className="absolute top-5 right-5 z-10 flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100/90 text-slate-700 border border-slate-200/80 backdrop-blur-xs shadow-xs"><Sparkles className="w-3.5 h-3.5 text-amber-500" /><span>MF Secured</span></span>
          <button type="button" onClick={() => setIsFullscreen(true)} title="View Full Resolution" className="p-2 rounded-full bg-white/90 text-slate-700 border border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-xs cursor-pointer"><Maximize2 className="w-4 h-4" /></button>
        </div>
        <div onClick={() => setIsFullscreen(true)} className="w-full h-full flex items-center justify-center cursor-zoom-in overflow-hidden">
          <img src={imageUrl} alt={activeImage?.altText || productName} onError={() => setHasError(true)} referrerPolicy="no-referrer" className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md" loading="eager" />
        </div>
        <div className="absolute bottom-3 right-4 text-[11px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center space-x-1"><Maximize2 className="w-3 h-3" /><span>Click to enlarge</span></div>
      </div>

      {images && images.length > 1 && <div className="flex items-center justify-center gap-3 mt-4 overflow-x-auto py-2 max-w-full">
        {images.map((img, idx) => <button key={img.id || idx} onClick={() => { setSelectedImageIndex(idx); setHasError(false); }} className={`relative w-20 h-20 rounded-2xl bg-white p-1.5 border-2 transition-all flex items-center justify-center overflow-hidden shrink-0 cursor-pointer ${selectedImageIndex === idx ? 'border-blue-600 shadow-sm ring-2 ring-blue-100 scale-105' : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'}`}>
          <img src={resolveImageUrl(img, productName)} alt={img.altText || `${productName} thumbnail ${idx + 1}`} referrerPolicy="no-referrer" onError={(e) => { (e.target as HTMLImageElement).src = getBrandFallbackImage(productName, img.altText); }} className="w-full h-full object-contain" />
        </button>)}
      </div>}

      {isFullscreen && createPortal(
        <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none" onClick={() => setIsFullscreen(false)}>
          <div className="w-full max-w-6xl flex items-center justify-between text-white mb-2 px-2 shrink-0" onClick={(e) => e.stopPropagation()}>
            <div><h3 className="text-base sm:text-lg font-bold">{productName}</h3><p className="text-xs text-slate-400">{activeImage?.altText || `View ${selectedImageIndex + 1} of ${images.length}`} • <span className="text-slate-300 font-medium">{selectedImageIndex + 1} / {images.length}</span></p></div>
            <button type="button" onClick={() => setIsFullscreen(false)} className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer" title="Close (Esc)"><X className="w-6 h-6" /></button>
          </div>
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center overflow-hidden my-auto" onClick={(e) => e.stopPropagation()}>
            {images.length > 1 && <button type="button" onClick={() => setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-sm transition-all cursor-pointer" title="Previous image"><ChevronLeft className="w-6 h-6" /></button>}
            <img src={imageUrl} alt={activeImage?.altText || productName} referrerPolicy="no-referrer" className="max-w-full max-h-[75vh] object-contain drop-shadow-2xl" />
            {images.length > 1 && <button type="button" onClick={() => setSelectedImageIndex((prev) => (prev + 1) % images.length)} className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-sm transition-all cursor-pointer" title="Next image"><ChevronRight className="w-6 h-6" /></button>}
          </div>
          {images.length > 1 && <div className="flex items-center gap-3 mt-3 py-2 overflow-x-auto max-w-full z-20 shrink-0" onClick={(e) => e.stopPropagation()}>{images.map((img, idx) => <button key={idx} onClick={() => setSelectedImageIndex(idx)} className={`w-16 h-16 rounded-xl overflow-hidden p-1 bg-white/10 border-2 transition-all shrink-0 cursor-pointer ${selectedImageIndex === idx ? 'border-blue-400 ring-2 ring-blue-400/50 scale-105' : 'border-white/20 opacity-60 hover:opacity-100'}`}><img src={resolveImageUrl(img, productName)} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-contain" /></button>)}</div>}
        </div>,
        document.body
      )}
    </div>
  );
};
