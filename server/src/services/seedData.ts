import { IProduct, IProductVariant, IProductImage, IEMIPlan } from '../types';
import { generateEMIPlansForPrincipal, calculateDiscountPercentage } from '../utils/emiCalculator';
import { VIVO_X300_ULTRA_VARIANTS } from './vivoX300UltraVariants';

export interface SeedProductInput {
  name: string; slug: string; brand: string; description: string; category: string; isNew: boolean;
  variants: { storage: string; colorName: string; colorHex: string; mrp: number; price: number; stock: number; isDefault: boolean;
    images: { url: string; altText: string; isPrimary: boolean; order: number }[];
  }[];
}

const IPHONE_SILVER_IMGS = [
  { url: '/images/products/iphone-17-pro/silver1.png', altText: 'iPhone 17 Pro Silver – Front View', isPrimary: true, order: 1 },
  { url: '/images/products/iphone-17-pro/silver2.png', altText: 'iPhone 17 Pro Silver – Back View', isPrimary: false, order: 2 },
  { url: '/images/products/iphone-17-pro/silver3.png', altText: 'iPhone 17 Pro Silver – Angled / Detail View', isPrimary: false, order: 3 },
];
const IPHONE_COSMIC_ORANGE_IMGS = [
  { url: '/images/products/iphone-17-pro/cosmicorange1.png', altText: 'iPhone 17 Pro Cosmic Orange – Front View', isPrimary: true, order: 1 },
  { url: '/images/products/iphone-17-pro/cosmicorange2.png', altText: 'iPhone 17 Pro Cosmic Orange – Back View', isPrimary: false, order: 2 },
  { url: '/images/products/iphone-17-pro/cosmicorange3.png', altText: 'iPhone 17 Pro Cosmic Orange – Angled / Detail View', isPrimary: false, order: 3 },
];
const IPHONE_DEEP_BLUE_IMGS = [
  { url: '/images/products/iphone-17-pro/deepblue1.png', altText: 'iPhone 17 Pro Deep Blue – Front View', isPrimary: true, order: 1 },
  { url: '/images/products/iphone-17-pro/deepblue2.png', altText: 'iPhone 17 Pro Deep Blue – Back View', isPrimary: false, order: 2 },
  { url: '/images/products/iphone-17-pro/deepblue3.png', altText: 'iPhone 17 Pro Deep Blue – Angled / Detail View', isPrimary: false, order: 3 },
];

const ONEPLUS_BLACK_IMGS = [
  { url: '/images/products/oneplus-12/silkyblack1.png', altText: 'OnePlus 12 5G Silky Black – Front and Back Product View', isPrimary: true, order: 1 },
  { url: '/images/products/oneplus-12/silkyblack2.png', altText: 'OnePlus 12 5G Silky Black – Front Display View', isPrimary: false, order: 2 },
  { url: '/images/products/oneplus-12/silkyblack3.png', altText: 'OnePlus 12 5G Silky Black – Rear Hasselblad Camera View', isPrimary: false, order: 3 },
  { url: '/images/products/oneplus-12/silkyblack4.png', altText: 'OnePlus 12 5G Silky Black – Side Profile View', isPrimary: false, order: 4 },
  { url: '/images/products/oneplus-12/silkyblack5.png', altText: 'OnePlus 12 5G Silky Black – Angled Detail View', isPrimary: false, order: 5 },
];
const ONEPLUS_EMERALD_IMGS = [
  { url: '/images/products/oneplus-12/flowyemerald1.png', altText: 'OnePlus 12 5G Flowy Emerald – Front and Back Product View', isPrimary: true, order: 1 },
  { url: '/images/products/oneplus-12/flowyemerald2.png', altText: 'OnePlus 12 5G Flowy Emerald – Front Display View', isPrimary: false, order: 2 },
  { url: '/images/products/oneplus-12/flowyemerald3.png', altText: 'OnePlus 12 5G Flowy Emerald – Rear Hasselblad Camera View', isPrimary: false, order: 3 },
  { url: '/images/products/oneplus-12/flowyemerald4.png', altText: 'OnePlus 12 5G Flowy Emerald – Side Profile View', isPrimary: false, order: 4 },
  { url: '/images/products/oneplus-12/flowyemerald5.png', altText: 'OnePlus 12 5G Flowy Emerald – Angled Detail View', isPrimary: false, order: 5 },
];

export const INITIAL_PRODUCTS_DATA: SeedProductInput[] = [
  {
    name: 'Apple iPhone 17 Pro', slug: 'iphone-17-pro', brand: 'Apple',
    description: 'The groundbreaking iPhone 17 Pro with Grade 5 Titanium finish, A19 Pro Bionic silicon, ProMotion 120Hz Super Retina XDR display, and 48MP triple camera system with 5x optical telephoto.',
    category: 'Smartphones', isNew: true,
    variants: [
      { storage: '256GB', colorName: 'Silver', colorHex: '#E3E4E5', mrp: 134900, price: 127400, stock: 45, isDefault: true, images: IPHONE_SILVER_IMGS },
      { storage: '512GB', colorName: 'Silver', colorHex: '#E3E4E5', mrp: 154900, price: 146900, stock: 30, isDefault: false, images: IPHONE_SILVER_IMGS },
      { storage: '1TB', colorName: 'Silver', colorHex: '#E3E4E5', mrp: 174900, price: 165900, stock: 20, isDefault: false, images: IPHONE_SILVER_IMGS },
      { storage: '256GB', colorName: 'Cosmic Orange', colorHex: '#E87D3E', mrp: 134900, price: 127400, stock: 40, isDefault: false, images: IPHONE_COSMIC_ORANGE_IMGS },
      { storage: '512GB', colorName: 'Cosmic Orange', colorHex: '#E87D3E', mrp: 154900, price: 146900, stock: 25, isDefault: false, images: IPHONE_COSMIC_ORANGE_IMGS },
      { storage: '1TB', colorName: 'Cosmic Orange', colorHex: '#E87D3E', mrp: 174900, price: 165900, stock: 15, isDefault: false, images: IPHONE_COSMIC_ORANGE_IMGS },
      { storage: '256GB', colorName: 'Deep Blue', colorHex: '#1E3A5F', mrp: 134900, price: 127400, stock: 35, isDefault: false, images: IPHONE_DEEP_BLUE_IMGS },
      { storage: '512GB', colorName: 'Deep Blue', colorHex: '#1E3A5F', mrp: 154900, price: 146900, stock: 25, isDefault: false, images: IPHONE_DEEP_BLUE_IMGS },
      { storage: '1TB', colorName: 'Deep Blue', colorHex: '#1E3A5F', mrp: 174900, price: 165900, stock: 20, isDefault: false, images: IPHONE_DEEP_BLUE_IMGS },
    ],
  },
  {
    name: 'vivo X300 Ultra', slug: 'vivo-x300-ultra', brand: 'vivo',
    description: 'vivo X300 Ultra co-engineered with ZEISS. Featuring ZEISS Triple Prime Lenses, 200MP ZEISS Gimbal-Grade APO Telephoto Camera, Snapdragon® 8 Elite Gen 5 with Pro Imaging Chip VS1+, and 2K 120Hz E7 LTPO AMOLED Display.',
    category: 'Smartphones', isNew: true, variants: VIVO_X300_ULTRA_VARIANTS,
  },
  {
    name: 'OnePlus 12 5G', slug: 'oneplus-12', brand: 'OnePlus',
    description: 'OnePlus 12 powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System for Mobile, 2K 120 Hz ProXDR Display, and 100W SUPERVOOC charging.',
    category: 'Smartphones', isNew: false,
    variants: [
      { storage: '256GB', colorName: 'Silky Black', colorHex: '#1A1A1A', mrp: 64999, price: 64999, stock: 60, isDefault: true, images: ONEPLUS_BLACK_IMGS },
      { storage: '512GB', colorName: 'Silky Black', colorHex: '#1A1A1A', mrp: 69999, price: 69999, stock: 30, isDefault: false, images: ONEPLUS_BLACK_IMGS },
      { storage: '256GB', colorName: 'Flowy Emerald', colorHex: '#2E473B', mrp: 64999, price: 64999, stock: 40, isDefault: false, images: ONEPLUS_EMERALD_IMGS },
      { storage: '512GB', colorName: 'Flowy Emerald', colorHex: '#2E473B', mrp: 69999, price: 69999, stock: 40, isDefault: false, images: ONEPLUS_EMERALD_IMGS },
    ],
  },
];
