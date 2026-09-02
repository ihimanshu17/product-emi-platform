import type { SeedProductInput } from './seedData';

// vivo X300 Ultra official India product photography
// Source: Official vivo India store (https://shop.vivo.com/in/product/10348)
// and official vivo India gallery (https://www.vivo.com/in/products/picture/x300-ultra)
const VIVO_ECLIPSE_BLACK_IMGS = [
  {
    url: '/images/products/vivo-x300-ultra/eclipseblack1.png',
    altText: 'vivo X300 Ultra Eclipse Black – Front & Back Duo Showcase',
    isPrimary: true,
    order: 1,
  },
  {
    url: '/images/products/vivo-x300-ultra/eclipseblack2.png',
    altText: 'vivo X300 Ultra Eclipse Black – 2K E7 AMOLED Display View',
    isPrimary: false,
    order: 2,
  },
  {
    url: '/images/products/vivo-x300-ultra/eclipseblack3.png',
    altText: 'vivo X300 Ultra Eclipse Black – Rear ZEISS Camera Module & Satin AG Glass',
    isPrimary: false,
    order: 3,
  },
  {
    url: '/images/products/vivo-x300-ultra/eclipseblack4.png',
    altText: 'vivo X300 Ultra Eclipse Black – Side Profile Metal Frame View',
    isPrimary: false,
    order: 4,
  },
];

const VIVO_VICTORY_GREEN_IMGS = [
  {
    url: '/images/products/vivo-x300-ultra/victorygreen1.png',
    altText: 'vivo X300 Ultra Victory Green – Front & Back Duo Showcase',
    isPrimary: true,
    order: 1,
  },
  {
    url: '/images/products/vivo-x300-ultra/victorygreen2.png',
    altText: 'vivo X300 Ultra Victory Green – 2K E7 AMOLED Display View',
    isPrimary: false,
    order: 2,
  },
  {
    url: '/images/products/vivo-x300-ultra/victorygreen3.png',
    altText: 'vivo X300 Ultra Victory Green – Rear ZEISS Camera Module & Dual-Tone Green Finish',
    isPrimary: false,
    order: 3,
  },
  {
    url: '/images/products/vivo-x300-ultra/victorygreen4.png',
    altText: 'vivo X300 Ultra Victory Green – Side Profile Metal Frame View',
    isPrimary: false,
    order: 4,
  },
];

// Official verified India variants for vivo X300 Ultra:
// Selling Price: ₹1,59,999, MRP: ₹1,99,999, RAM: 16GB, Storage: 512GB
export const VIVO_X300_ULTRA_VARIANTS: SeedProductInput['variants'] = [
  {
    storage: '16GB+512GB',
    colorName: 'Eclipse Black',
    colorHex: '#232325',
    mrp: 199999,
    price: 159999,
    stock: 40,
    isDefault: true,
    images: VIVO_ECLIPSE_BLACK_IMGS,
  },
  {
    storage: '16GB+512GB',
    colorName: 'Victory Green',
    colorHex: '#CAD3BE',
    mrp: 199999,
    price: 159999,
    stock: 40,
    isDefault: false,
    images: VIVO_VICTORY_GREEN_IMGS,
  },
];
