import request from 'supertest';
import app from '../src/app';

describe('REST API Endpoints Integration Tests', () => {
  describe('GET /api/health', () => {
    it('should return 200 and healthy service status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('UP');
    });
  });

  describe('GET /api/products', () => {
    it('should return all available products with variants and starting price', async () => {
      const res = await request(app).get('/api/products');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(3);

      const firstProduct = res.body.data[0];
      expect(firstProduct).toHaveProperty('id');
      expect(firstProduct).toHaveProperty('name');
      expect(firstProduct).toHaveProperty('slug');
      expect(firstProduct).toHaveProperty('variants');
      expect(firstProduct.variants.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('GET /api/products/:slug', () => {
    it('should return full details for existing product slug (iphone-17-pro)', async () => {
      const res = await request(app).get('/api/products/iphone-17-pro');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('iphone-17-pro');
      expect(res.body.data.variants.length).toBeGreaterThanOrEqual(3);

      const defaultVariant = res.body.data.variants[0];
      expect(defaultVariant).toHaveProperty('images');
      expect(defaultVariant.images.length).toBeGreaterThan(0);
      expect(defaultVariant).toHaveProperty('emiPlans');
      expect(defaultVariant.emiPlans.length).toBeGreaterThanOrEqual(5);
    });

    it('should return 404 for non-existent product slug', async () => {
      const res = await request(app).get('/api/products/non-existent-phone-model-xyz');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('not found');
    });
  });

  describe('GET /api/products/:slug/emi-plans', () => {
    it('should return calculated EMI plans for a specific product and variant', async () => {
      // First fetch product to get a variant id
      const prodRes = await request(app).get('/api/products/iphone-17-pro');
      const variantId = prodRes.body.data.variants[0].id;

      const res = await request(app).get(`/api/products/iphone-17-pro/emi-plans?variantId=${variantId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('emiPlans');
      expect(res.body.data.emiPlans.length).toBeGreaterThanOrEqual(5);
      expect(res.body.data.variant.id).toBe(variantId);
    });
  });

  describe('GET /api/variants/:variantId', () => {
    it('should return full variant details for a valid variant ID', async () => {
      const prodRes = await request(app).get('/api/products/oneplus-12');
      const variantId = prodRes.body.data.variants[0].id;

      const res = await request(app).get(`/api/variants/${variantId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBe(variantId);
      expect(res.body.data).toHaveProperty('storage');
      expect(res.body.data).toHaveProperty('colorName');
      expect(res.body.data).toHaveProperty('price');
    });

    it('should return 404 for invalid variant ID', async () => {
      const res = await request(app).get('/api/variants/invalid-var-999999');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/orders/proceed', () => {
    it('should process and confirm an EMI loan application successfully', async () => {
      const prodRes = await request(app).get('/api/products/iphone-17-pro');
      const variant = prodRes.body.data.variants[0];

      const payload = {
        variantId: variant.id,
        tenureMonths: 12,
        customerName: 'Rahul Sharma',
        customerPhone: '9876543210',
        customerEmail: 'rahul.sharma@example.com',
      };

      const res = await request(app).post('/api/orders/proceed').send(payload);
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('order');
      expect(res.body.data.order).toHaveProperty('orderNumber');
      expect(res.body.data.order.status).toBe('CONFIRMED');
      expect(res.body.data.order.tenureMonths).toBe(12);
    });

    it('should return 400 for invalid email or missing fields', async () => {
      const payload = {
        variantId: 'some-id',
        tenureMonths: 12,
        customerName: 'A',
        customerPhone: '123',
        customerEmail: 'invalid-email',
      };

      const res = await request(app).post('/api/orders/proceed').send(payload);
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toContain('Validation error');
    });
  });
});
