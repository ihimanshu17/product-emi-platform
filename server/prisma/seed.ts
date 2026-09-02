import { PrismaClient } from '@prisma/client';
import { INITIAL_PRODUCTS_DATA } from '../src/services/seedData';
import '../src/services/vivoX300UltraVariants';
import { generateEMIPlansForPrincipal } from '../src/utils/emiCalculator';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding with Prisma...');

  // Clean existing records in correct relation order
  await prisma.order.deleteMany({});
  await prisma.eMIPlan.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});

  console.log('🧹 Cleaned existing database tables.');

  let totalProducts = 0;
  let totalVariants = 0;
  let totalEMIPlans = 0;

  for (const prodData of INITIAL_PRODUCTS_DATA) {
    const createdProduct = await prisma.product.create({
      data: {
        name: prodData.name,
        slug: prodData.slug,
        brand: prodData.brand,
        description: prodData.description,
        category: prodData.category,
        isNew: prodData.isNew,
      },
    });
    totalProducts++;

    for (const variantData of prodData.variants) {
      const createdVariant = await prisma.productVariant.create({
        data: {
          productId: createdProduct.id,
          storage: variantData.storage,
          colorName: variantData.colorName,
          colorHex: variantData.colorHex,
          mrp: variantData.mrp,
          price: variantData.price,
          stock: variantData.stock,
          isDefault: variantData.isDefault,
        },
      });
      totalVariants++;

      for (const img of variantData.images) {
        await prisma.productImage.create({
          data: {
            variantId: createdVariant.id,
            url: img.url,
            altText: img.altText,
            isPrimary: img.isPrimary,
            order: img.order,
          },
        });
      }

      const calculatedPlans = generateEMIPlansForPrincipal(variantData.price);
      for (const plan of calculatedPlans) {
        await prisma.eMIPlan.create({
          data: {
            variantId: createdVariant.id,
            tenureMonths: plan.tenureMonths,
            interestRate: plan.interestRate,
            monthlyPayment: plan.monthlyPayment,
            cashback: plan.cashback,
            totalPayable: plan.totalPayable,
            isPopular: plan.isPopular,
          },
        });
        totalEMIPlans++;
      }
    }
  }

  console.log(`✅ Seeding completed successfully!`);
  console.log(`📊 Summary: ${totalProducts} Products, ${totalVariants} Variants, ${totalEMIPlans} EMI Plans.`);
}

main()
  .catch((e) => {
    console.error('❌ Error during Prisma seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
