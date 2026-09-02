import { IProduct, IProductVariant } from '../types/product';
import { IEMIPlan, IProceedOrderPayload, IProceedOrderResponse } from '../types/emi';

export function calculateFallbackEMIPlans(price: number, variantId: string): IEMIPlan[] {
  const tenures = [
    { months: 3, rate: 0, cashback: 1500, popular: false },
    { months: 6, rate: 0, cashback: 3000, popular: true },
    { months: 12, rate: 0, cashback: 5000, popular: false },
    { months: 18, rate: 8.5, cashback: 6000, popular: false },
    { months: 24, rate: 10.5, cashback: 7500, popular: false },
  ];

  return tenures.map((t, idx) => {
    let monthly: number;
    let total: number;

    if (t.rate === 0) {
      monthly = Math.round(price / t.months);
      total = price;
    } else {
      const monthlyRate = t.rate / 12 / 100;
      monthly = Math.round(
        (price * monthlyRate * Math.pow(1 + monthlyRate, t.months)) /
          (Math.pow(1 + monthlyRate, t.months) - 1)
      );
      total = monthly * t.months;
    }

    return {
      id: `emi-fallback-${variantId}-${t.months}`,
      variantId,
      tenureMonths: t.months,
      interestRate: t.rate,
      monthlyPayment: monthly,
      cashback: t.cashback,
      totalPayable: total,
      totalInterest: Math.max(0, total - price),
      netEffectiveCost: total - t.cashback,
      isPopular: t.popular,
    };
  });
}

const IPHONE_SILVER_IMGS = [
  { id: 'img-ip-s1', variantId: 'var-ip-s', url: '/images/products/iphone-17-pro/silver1.png', altText: 'iPhone 17 Pro Silver – Front View', isPrimary: true, order: 1 },
  { id: 'img-ip-s2', variantId: 'var-ip-s', url: '/images/products/iphone-17-pro/silver2.png', altText: 'iPhone 17 Pro Silver – Back View', isPrimary: false, order: 2 },
  { id: 'img-ip-s3', variantId: 'var-ip-s', url: '/images/products/iphone-17-pro/silver3.png', altText: 'iPhone 17 Pro Silver – Angled / Detail View', isPrimary: false, order: 3 },
];

const IPHONE_COSMIC_ORANGE_IMGS = [
  { id: 'img-ip-o1', variantId: 'var-ip-o', url: '/images/products/iphone-17-pro/cosmicorange1.png', altText: 'iPhone 17 Pro Cosmic Orange – Front View', isPrimary: true, order: 1 },
  { id: 'img-ip-o2', variantId: 'var-ip-o', url: '/images/products/iphone-17-pro/cosmicorange2.png', altText: 'iPhone 17 Pro Cosmic Orange – Back View', isPrimary: false, order: 2 },
  { id: 'img-ip-o3', variantId: 'var-ip-o', url: '/images/products/iphone-17-pro/cosmicorange3.png', altText: 'iPhone 17 Pro Cosmic Orange – Angled / Detail View', isPrimary: false, order: 3 },
];

const IPHONE_DEEP_BLUE_IMGS = [
  { id: 'img-ip-b1', variantId: 'var-ip-b', url: '/images/products/iphone-17-pro/deepblue1.png', altText: 'iPhone 17 Pro Deep Blue – Front View', isPrimary: true, order: 1 },
  { id: 'img-ip-b2', variantId: 'var-ip-b', url: '/images/products/iphone-17-pro/deepblue2.png', altText: 'iPhone 17 Pro Deep Blue – Back View', isPrimary: false, order: 2 },
  { id: 'img-ip-b3', variantId: 'var-ip-b', url: '/images/products/iphone-17-pro/deepblue3.png', altText: 'iPhone 17 Pro Deep Blue – Angled / Detail View', isPrimary: false, order: 3 },
];

const ONEPLUS_BLACK_IMGS = [
  { id: 'img-op-b1', variantId: 'var-op-b', url: '/images/products/oneplus-12/silkyblack1.png', altText: 'OnePlus 12 5G Silky Black – Front and Back Product View', isPrimary: true, order: 1 },
  { id: 'img-op-b2', variantId: 'var-op-b', url: '/images/products/oneplus-12/silkyblack2.png', altText: 'OnePlus 12 5G Silky Black – Front Display View', isPrimary: false, order: 2 },
  { id: 'img-op-b3', variantId: 'var-op-b', url: '/images/products/oneplus-12/silkyblack3.png', altText: 'OnePlus 12 5G Silky Black – Rear Hasselblad Camera View', isPrimary: false, order: 3 },
  { id: 'img-op-b4', variantId: 'var-op-b', url: '/images/products/oneplus-12/silkyblack4.png', altText: 'OnePlus 12 5G Silky Black – Side Profile View', isPrimary: false, order: 4 },
  { id: 'img-op-b5', variantId: 'var-op-b', url: '/images/products/oneplus-12/silkyblack5.png', altText: 'OnePlus 12 5G Silky Black – Angled Detail View', isPrimary: false, order: 5 },
];

const ONEPLUS_EMERALD_IMGS = [
  { id: 'img-op-e1', variantId: 'var-op-e', url: '/images/products/oneplus-12/flowyemerald1.png', altText: 'OnePlus 12 5G Flowy Emerald – Front and Back Product View', isPrimary: true, order: 1 },
  { id: 'img-op-e2', variantId: 'var-op-e', url: '/images/products/oneplus-12/flowyemerald2.png', altText: 'OnePlus 12 5G Flowy Emerald – Front Display View', isPrimary: false, order: 2 },
  { id: 'img-op-e3', variantId: 'var-op-e', url: '/images/products/oneplus-12/flowyemerald3.png', altText: 'OnePlus 12 5G Flowy Emerald – Rear Hasselblad Camera View', isPrimary: false, order: 3 },
  { id: 'img-op-e4', variantId: 'var-op-e', url: '/images/products/oneplus-12/flowyemerald4.png', altText: 'OnePlus 12 5G Flowy Emerald – Side Profile View', isPrimary: false, order: 4 },
  { id: 'img-op-e5', variantId: 'var-op-e', url: '/images/products/oneplus-12/flowyemerald5.png', altText: 'OnePlus 12 5G Flowy Emerald – Angled Detail View', isPrimary: false, order: 5 },
];

const VIVO_ECLIPSE_BLACK_IMGS = [
  { id: 'img-vx-eb1', variantId: 'var-vx-eb', url: '/images/products/vivo-x300-ultra/eclipseblack1.png', altText: 'vivo X300 Ultra Eclipse Black – Front & Back Duo Showcase', isPrimary: true, order: 1 },
  { id: 'img-vx-eb2', variantId: 'var-vx-eb', url: '/images/products/vivo-x300-ultra/eclipseblack2.png', altText: 'vivo X300 Ultra Eclipse Black – 2K E7 AMOLED Display View', isPrimary: false, order: 2 },
  { id: 'img-vx-eb3', variantId: 'var-vx-eb', url: '/images/products/vivo-x300-ultra/eclipseblack3.png', altText: 'vivo X300 Ultra Eclipse Black – Rear ZEISS Camera Module & Satin AG Glass', isPrimary: false, order: 3 },
  { id: 'img-vx-eb4', variantId: 'var-vx-eb', url: '/images/products/vivo-x300-ultra/eclipseblack4.png', altText: 'vivo X300 Ultra Eclipse Black – Side Profile Metal Frame View', isPrimary: false, order: 4 },
];

const VIVO_VICTORY_GREEN_IMGS = [
  { id: 'img-vx-vg1', variantId: 'var-vx-vg', url: '/images/products/vivo-x300-ultra/victorygreen1.png', altText: 'vivo X300 Ultra Victory Green – Front & Back Duo Showcase', isPrimary: true, order: 1 },
  { id: 'img-vx-vg2', variantId: 'var-vx-vg', url: '/images/products/vivo-x300-ultra/victorygreen2.png', altText: 'vivo X300 Ultra Victory Green – 2K E7 AMOLED Display View', isPrimary: false, order: 2 },
  { id: 'img-vx-vg3', variantId: 'var-vx-vg', url: '/images/products/vivo-x300-ultra/victorygreen3.png', altText: 'vivo X300 Ultra Victory Green – Rear ZEISS Camera Module & Dual-Tone Green Finish', isPrimary: false, order: 3 },
  { id: 'img-vx-vg4', variantId: 'var-vx-vg', url: '/images/products/vivo-x300-ultra/victorygreen4.png', altText: 'vivo X300 Ultra Victory Green – Side Profile Metal Frame View', isPrimary: false, order: 4 },
];

export const FALLBACK_PRODUCTS: IProduct[] = [
  {
    id: 'prod-iphone-17-pro',
    name: 'Apple iPhone 17 Pro',
    slug: 'iphone-17-pro',
    brand: 'Apple',
    description: 'The groundbreaking iPhone 17 Pro with Grade 5 Titanium finish, A19 Pro Bionic silicon, ProMotion 120Hz Super Retina XDR display, and 48MP triple camera system with 5x optical telephoto.',
    category: 'Smartphones',
    isNew: true,
    startingPrice: 127400,
    totalVariants: 9,
    variants: [
      { id: 'v-ip-256-s', productId: 'prod-iphone-17-pro', storage: '256GB', colorName: 'Silver', colorHex: '#E3E4E5', mrp: 134900, price: 127400, stock: 45, isDefault: true, discountPercentage: 6, images: IPHONE_SILVER_IMGS },
      { id: 'v-ip-512-s', productId: 'prod-iphone-17-pro', storage: '512GB', colorName: 'Silver', colorHex: '#E3E4E5', mrp: 154900, price: 146900, stock: 30, isDefault: false, discountPercentage: 5, images: IPHONE_SILVER_IMGS },
      { id: 'v-ip-1tb-s', productId: 'prod-iphone-17-pro', storage: '1TB', colorName: 'Silver', colorHex: '#E3E4E5', mrp: 174900, price: 165900, stock: 20, isDefault: false, discountPercentage: 5, images: IPHONE_SILVER_IMGS },
      { id: 'v-ip-256-o', productId: 'prod-iphone-17-pro', storage: '256GB', colorName: 'Cosmic Orange', colorHex: '#E87D3E', mrp: 134900, price: 127400, stock: 40, isDefault: false, discountPercentage: 6, images: IPHONE_COSMIC_ORANGE_IMGS },
      { id: 'v-ip-512-o', productId: 'prod-iphone-17-pro', storage: '512GB', colorName: 'Cosmic Orange', colorHex: '#E87D3E', mrp: 154900, price: 146900, stock: 25, isDefault: false, discountPercentage: 5, images: IPHONE_COSMIC_ORANGE_IMGS },
      { id: 'v-ip-1tb-o', productId: 'prod-iphone-17-pro', storage: '1TB', colorName: 'Cosmic Orange', colorHex: '#E87D3E', mrp: 174900, price: 165900, stock: 15, isDefault: false, discountPercentage: 5, images: IPHONE_COSMIC_ORANGE_IMGS },
      { id: 'v-ip-256-b', productId: 'prod-iphone-17-pro', storage: '256GB', colorName: 'Deep Blue', colorHex: '#1E3A5F', mrp: 134900, price: 127400, stock: 35, isDefault: false, discountPercentage: 6, images: IPHONE_DEEP_BLUE_IMGS },
      { id: 'v-ip-512-b', productId: 'prod-iphone-17-pro', storage: '512GB', colorName: 'Deep Blue', colorHex: '#1E3A5F', mrp: 154900, price: 146900, stock: 25, isDefault: false, discountPercentage: 5, images: IPHONE_DEEP_BLUE_IMGS },
      { id: 'v-ip-1tb-b', productId: 'prod-iphone-17-pro', storage: '1TB', colorName: 'Deep Blue', colorHex: '#1E3A5F', mrp: 174900, price: 165900, stock: 20, isDefault: false, discountPercentage: 5, images: IPHONE_DEEP_BLUE_IMGS },
    ],
  },
  {
    id: 'prod-vivo-x300-ultra',
    name: 'vivo X300 Ultra',
    slug: 'vivo-x300-ultra',
    brand: 'vivo',
    description: 'vivo X300 Ultra co-engineered with ZEISS. Featuring ZEISS Triple Prime Lenses, 200MP ZEISS Gimbal-Grade APO Telephoto Camera, Snapdragon® 8 Elite Gen 5 with Pro Imaging Chip VS1+, and 2K 120Hz E7 LTPO AMOLED Display.',
    category: 'Smartphones',
    isNew: true,
    startingPrice: 159999,
    totalVariants: 2,
    variants: [
      {
        id: 'v-vx-512-eb',
        productId: 'prod-vivo-x300-ultra',
        storage: '16GB+512GB',
        colorName: 'Eclipse Black',
        colorHex: '#232325',
        mrp: 199999,
        price: 159999,
        stock: 40,
        isDefault: true,
        discountPercentage: 20,
        images: VIVO_ECLIPSE_BLACK_IMGS,
      },
      {
        id: 'v-vx-512-vg',
        productId: 'prod-vivo-x300-ultra',
        storage: '16GB+512GB',
        colorName: 'Victory Green',
        colorHex: '#CAD3BE',
        mrp: 199999,
        price: 159999,
        stock: 40,
        isDefault: false,
        discountPercentage: 20,
        images: VIVO_VICTORY_GREEN_IMGS,
      },
    ],
  },
  {
    id: 'prod-oneplus-12',
    name: 'OnePlus 12 5G',
    slug: 'oneplus-12',
    brand: 'OnePlus',
    description: 'Flagship powerhouse equipped with Snapdragon 8 Gen 3, 2K 120Hz ProXDR display, 4th Gen Hasselblad Camera System, and revolutionary 100W SUPERVOOC charging.',
    category: 'Smartphones',
    isNew: false,
    startingPrice: 64999,
    totalVariants: 4,
    variants: [
      { id: 'v-op-256-b', productId: 'prod-oneplus-12', storage: '256GB', colorName: 'Silky Black', colorHex: '#1A1A1A', mrp: 69999, price: 64999, stock: 50, isDefault: true, discountPercentage: 7, images: ONEPLUS_BLACK_IMGS },
      { id: 'v-op-512-b', productId: 'prod-oneplus-12', storage: '512GB', colorName: 'Silky Black', colorHex: '#1A1A1A', mrp: 74999, price: 69999, stock: 35, isDefault: false, discountPercentage: 7, images: ONEPLUS_BLACK_IMGS },
      { id: 'v-op-256-e', productId: 'prod-oneplus-12', storage: '256GB', colorName: 'Flowy Emerald', colorHex: '#2E5A44', mrp: 69999, price: 64999, stock: 40, isDefault: false, discountPercentage: 7, images: ONEPLUS_EMERALD_IMGS },
      { id: 'v-op-512-e', productId: 'prod-oneplus-12', storage: '512GB', colorName: 'Flowy Emerald', colorHex: '#2E5A44', mrp: 74999, price: 69999, stock: 30, isDefault: false, discountPercentage: 7, images: ONEPLUS_EMERALD_IMGS },
    ],
  },
];
