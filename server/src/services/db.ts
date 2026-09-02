import { PrismaClient } from '@prisma/client';
import { INITIAL_PRODUCTS_DATA } from './seedData';
import './vivoX300UltraVariants';
import { IProduct, IProductVariant, IProductImage, IEMIPlan } from '../types';
import { generateEMIPlansForPrincipal, calculateDiscountPercentage } from '../utils/emiCalculator';

export let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (err) {
  // Initialization deferred to checkPrismaConnection
}

let isPrismaAvailable = false;
let checkPrismaPromise: Promise<boolean> | null = null;

export async function checkPrismaConnection(): Promise<boolean> {
  if (checkPrismaPromise) return checkPrismaPromise;
  checkPrismaPromise = (async () => {
    if (!prisma) {
      try {
        prisma = new PrismaClient();
      } catch (err) {
        isPrismaAvailable = false;
        console.log('ℹ️ Prisma client not generated. Running with high-fidelity in-memory data store.');
        return false;
      }
    }
    try {
      await prisma.$connect();
      await prisma.product.count();
      isPrismaAvailable = true;
      console.log('✅ Connected to PostgreSQL database via Prisma.');
      return true;
    } catch (err) {
      isPrismaAvailable = false;
      console.log('ℹ️ PostgreSQL not reachable. Running with high-fidelity in-memory data store.');
      return false;
    }
  })();
  return checkPrismaPromise;
}

interface MemoryStore {
  products: IProduct[];
  variants: IProductVariant[];
  images: IProductImage[];
  emiPlans: IEMIPlan[];
  orders: any[];
}

const memoryStore: MemoryStore = { products: [], variants: [], images: [], emiPlans: [], orders: [] };

function initializeMemoryStore() {
  memoryStore.products = [];
  memoryStore.variants = [];
  memoryStore.images = [];
  memoryStore.emiPlans = [];
  memoryStore.orders = [];
  let prodIndex = 1;
  let varIndex = 1;
  let imgIndex = 1;
  let emiIndex = 1;

  for (const p of INITIAL_PRODUCTS_DATA) {
    const productId = `prod-${prodIndex++}`;
    const productVariants: IProductVariant[] = [];
    for (const v of p.variants) {
      const variantId = `var-${varIndex++}`;
      const variantImages: IProductImage[] = [];
      for (const img of v.images) {
        const imageObj: IProductImage = { id: `img-${imgIndex++}`, variantId, url: img.url, altText: img.altText, isPrimary: img.isPrimary, order: img.order };
        variantImages.push(imageObj);
        memoryStore.images.push(imageObj);
      }
      const calculatedEMIPlans: IEMIPlan[] = generateEMIPlansForPrincipal(v.price).map((plan) => ({ id: `emi-${emiIndex++}`, variantId, tenureMonths: plan.tenureMonths, interestRate: plan.interestRate, monthlyPayment: plan.monthlyPayment, cashback: plan.cashback, totalPayable: plan.totalPayable, totalInterest: plan.totalInterest, netEffectiveCost: plan.netEffectiveCost, isPopular: plan.isPopular }));
      for (const emi of calculatedEMIPlans) memoryStore.emiPlans.push(emi);
      const variantObj: IProductVariant = { id: variantId, productId, storage: v.storage, colorName: v.colorName, colorHex: v.colorHex, mrp: v.mrp, price: v.price, stock: v.stock, isDefault: v.isDefault, discountPercentage: calculateDiscountPercentage(v.mrp, v.price), images: variantImages, emiPlans: calculatedEMIPlans };
      productVariants.push(variantObj);
      memoryStore.variants.push(variantObj);
    }
    const startingPrice = Math.min(...productVariants.map((v) => v.price));
    memoryStore.products.push({ id: productId, name: p.name, slug: p.slug, brand: p.brand, description: p.description, category: p.category, isNew: p.isNew, variants: productVariants, startingPrice, totalVariants: productVariants.length, createdAt: new Date(), updatedAt: new Date() });
  }
}

initializeMemoryStore();

export const dbService = {
  async getAllProducts(): Promise<IProduct[]> {
    const isDbConnected = await checkPrismaConnection();
    if (isDbConnected && prisma) {
      try {
        const products = await prisma.product.findMany({ include: { variants: { include: { images: { orderBy: { order: 'asc' } }, emiPlans: { orderBy: { tenureMonths: 'asc' } } } } } });
        return products.map((p) => {
          const variants: IProductVariant[] = p.variants.map((v) => ({ id: v.id, productId: v.productId, storage: v.storage, colorName: v.colorName, colorHex: v.colorHex, mrp: v.mrp, price: v.price, stock: v.stock, isDefault: v.isDefault, discountPercentage: calculateDiscountPercentage(v.mrp, v.price), images: v.images, emiPlans: v.emiPlans.map((plan) => ({ ...plan, totalInterest: Math.max(0, plan.totalPayable - v.price), netEffectiveCost: plan.totalPayable - plan.cashback })) }));
          return { id: p.id, name: p.name, slug: p.slug, brand: p.brand, description: p.description, category: p.category, isNew: p.isNew, variants, startingPrice: variants.length > 0 ? Math.min(...variants.map((v) => v.price)) : 0, totalVariants: variants.length, createdAt: p.createdAt, updatedAt: p.updatedAt };
        });
      } catch (e) { console.warn('Prisma query failed, falling back to memory store', e); }
    }
    return memoryStore.products;
  },

  async getProductBySlug(slug: string): Promise<IProduct | null> {
    const isDbConnected = await checkPrismaConnection();
    if (isDbConnected && prisma) {
      try {
        const p = await prisma.product.findUnique({ where: { slug }, include: { variants: { include: { images: { orderBy: { order: 'asc' } }, emiPlans: { orderBy: { tenureMonths: 'asc' } } } } } });
        if (!p) return null;
        const variants: IProductVariant[] = p.variants.map((v) => ({ id: v.id, productId: v.productId, storage: v.storage, colorName: v.colorName, colorHex: v.colorHex, mrp: v.mrp, price: v.price, stock: v.stock, isDefault: v.isDefault, discountPercentage: calculateDiscountPercentage(v.mrp, v.price), images: v.images, emiPlans: v.emiPlans.map((plan) => ({ ...plan, totalInterest: Math.max(0, plan.totalPayable - v.price), netEffectiveCost: plan.totalPayable - plan.cashback })) }));
        return { id: p.id, name: p.name, slug: p.slug, brand: p.brand, description: p.description, category: p.category, isNew: p.isNew, variants, startingPrice: variants.length > 0 ? Math.min(...variants.map((v) => v.price)) : 0, totalVariants: variants.length, createdAt: p.createdAt, updatedAt: p.updatedAt };
      } catch (e) { console.warn('Prisma query failed, falling back to memory store', e); }
    }
    return memoryStore.products.find((p) => p.slug.toLowerCase() === slug.toLowerCase()) || null;
  },

  async getVariantById(variantId: string): Promise<IProductVariant | null> {
    const isDbConnected = await checkPrismaConnection();
    if (isDbConnected && prisma) {
      try {
        const v = await prisma.productVariant.findUnique({ where: { id: variantId }, include: { images: { orderBy: { order: 'asc' } }, emiPlans: { orderBy: { tenureMonths: 'asc' } } } });
        if (!v) return null;
        return { id: v.id, productId: v.productId, storage: v.storage, colorName: v.colorName, colorHex: v.colorHex, mrp: v.mrp, price: v.price, stock: v.stock, isDefault: v.isDefault, discountPercentage: calculateDiscountPercentage(v.mrp, v.price), images: v.images, emiPlans: v.emiPlans.map((plan) => ({ ...plan, totalInterest: Math.max(0, plan.totalPayable - v.price), netEffectiveCost: plan.totalPayable - plan.cashback })) };
      } catch (e) { console.warn('Prisma query failed, falling back to memory store', e); }
    }
    return memoryStore.variants.find((v) => v.id === variantId) || null;
  },

  async getEMIPlansForVariant(variantId: string): Promise<IEMIPlan[]> {
    const variant = await this.getVariantById(variantId);
    if (!variant) return [];
    if (variant.emiPlans && variant.emiPlans.length > 0) return variant.emiPlans;
    return generateEMIPlansForPrincipal(variant.price).map((g) => ({ id: `emi-dyn-${variantId}-${g.tenureMonths}`, variantId, tenureMonths: g.tenureMonths, interestRate: g.interestRate, monthlyPayment: g.monthlyPayment, cashback: g.cashback, totalPayable: g.totalPayable, totalInterest: g.totalInterest, netEffectiveCost: g.netEffectiveCost, isPopular: g.isPopular }));
  },

  async createOrder(orderData: { variantId: string; tenureMonths: number; monthlyPayment: number; interestRate: number; cashback: number; totalPayable: number; customerName: string; customerPhone: string; customerEmail: string; }) {
    const orderNumber = `1FI-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const isDbConnected = await checkPrismaConnection();
    if (isDbConnected && prisma) {
      try {
        return await prisma.order.create({ data: { orderNumber, variantId: orderData.variantId, tenureMonths: orderData.tenureMonths, monthlyPayment: orderData.monthlyPayment, interestRate: orderData.interestRate, cashback: orderData.cashback, totalPayable: orderData.totalPayable, customerName: orderData.customerName, customerPhone: orderData.customerPhone, customerEmail: orderData.customerEmail, status: 'CONFIRMED' } });
      } catch (e) { console.warn('Prisma create order failed, falling back to memory store', e); }
    }
    const order = { id: `order-${Date.now()}`, orderNumber, ...orderData, status: 'CONFIRMED', createdAt: new Date() };
    memoryStore.orders.push(order);
    return order;
  },

  async isHealthy(): Promise<{ dbConnected: boolean; totalProducts: number }> {
    const connected = await checkPrismaConnection();
    const products = await this.getAllProducts();
    return { dbConnected: connected, totalProducts: products.length };
  },
};
