import { useState, useEffect, useCallback, useMemo } from 'react';
import { IProduct, IProductVariant } from '../types/product';
import { IEMIPlan } from '../types/emi';
import { productService } from '../services/productService';

export function useProduct(slug: string | undefined) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<IProductVariant | null>(null);
  const [emiPlans, setEmiPlans] = useState<IEMIPlan[]>([]);
  const [selectedEmiPlan, setSelectedEmiPlan] = useState<IEMIPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [emiLoading, setEmiLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isProceedModalOpen, setIsProceedModalOpen] = useState(false);

  const applyEmiPlans = useCallback((plans: IEMIPlan[]) => {
    setEmiPlans(plans);
    const popular = plans.find((p) => p.isPopular) || plans[0];
    setSelectedEmiPlan(popular || null);
  }, []);

  const fetchEmiPlans = useCallback(async (productSlug: string, variant: IProductVariant) => {
    try {
      setEmiLoading(true);
      const res = await productService.getProductEMIPlans(productSlug, variant.id);
      applyEmiPlans(res.emiPlans || []);
    } catch (err) {
      console.error('Failed to load EMI plans for variant', err);
      setEmiPlans([]);
      setSelectedEmiPlan(null);
    } finally {
      setEmiLoading(false);
    }
  }, [applyEmiPlans]);

  // Fetch full product details
  const fetchProduct = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      setEmiPlans([]);
      setSelectedEmiPlan(null);

      const data = await productService.getProductBySlug(slug);
      setProduct(data);

      // Select default variant or first variant
      const defaultVar = data.variants.find((v) => v.isDefault) || data.variants[0];
      setSelectedVariant(defaultVar);

      // Always resolve EMI plans through the API for the initial variant.
      // This also handles existing database rows whose embedded emiPlans are empty.
      if (defaultVar) {
        if (defaultVar.emiPlans && defaultVar.emiPlans.length > 0) {
          applyEmiPlans(defaultVar.emiPlans);
        } else {
          await fetchEmiPlans(slug, defaultVar);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Product could not be loaded');
    } finally {
      setLoading(false);
    }
  }, [slug, applyEmiPlans, fetchEmiPlans]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // When variant changes, refresh EMI plans if needed
  const handleSelectVariant = useCallback(
    async (variant: IProductVariant) => {
      if (selectedVariant?.id === variant.id) return;
      setSelectedVariant(variant);
      setEmiPlans([]);
      setSelectedEmiPlan(null);

      if (variant.emiPlans && variant.emiPlans.length > 0) {
        const currentTenure = selectedEmiPlan?.tenureMonths;
        const matchingPlan = variant.emiPlans.find((p) => p.tenureMonths === currentTenure);
        const popular = variant.emiPlans.find((p) => p.isPopular) || variant.emiPlans[0];
        setEmiPlans(variant.emiPlans);
        setSelectedEmiPlan(matchingPlan || popular || null);
      } else if (slug) {
        await fetchEmiPlans(slug, variant);
      }
    },
    [selectedVariant, selectedEmiPlan, slug, fetchEmiPlans]
  );

  const availableStorages = useMemo(() => {
    if (!product) return [];
    return Array.from(new Set(product.variants.map((v) => v.storage)));
  }, [product]);

  const availableColors = useMemo(() => {
    if (!product) return [];
    const colorMap = new Map<string, { colorName: string; colorHex: string }>();
    product.variants.forEach((v) => {
      if (!colorMap.has(v.colorName)) {
        colorMap.set(v.colorName, { colorName: v.colorName, colorHex: v.colorHex });
      }
    });
    return Array.from(colorMap.values());
  }, [product]);

  const handleSelectStorage = useCallback(
    (storage: string) => {
      if (!product || !selectedVariant) return;
      let target = product.variants.find(
        (v) => v.storage === storage && v.colorName === selectedVariant.colorName
      );
      if (!target) target = product.variants.find((v) => v.storage === storage);
      if (target) handleSelectVariant(target);
    },
    [product, selectedVariant, handleSelectVariant]
  );

  const handleSelectColor = useCallback(
    (colorName: string) => {
      if (!product || !selectedVariant) return;
      let target = product.variants.find(
        (v) => v.colorName === colorName && v.storage === selectedVariant.storage
      );
      if (!target) target = product.variants.find((v) => v.colorName === colorName);
      if (target) handleSelectVariant(target);
    },
    [product, selectedVariant, handleSelectVariant]
  );

  return {
    product,
    selectedVariant,
    emiPlans,
    selectedEmiPlan,
    setSelectedEmiPlan,
    loading,
    emiLoading,
    error,
    refetch: fetchProduct,
    availableStorages,
    availableColors,
    handleSelectStorage,
    handleSelectColor,
    handleSelectVariant,
    isProceedModalOpen,
    setIsProceedModalOpen,
  };
}
