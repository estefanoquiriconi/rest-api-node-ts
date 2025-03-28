import request from 'supertest';
import server from '../../server';

describe('POST /api/productos', () => {
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/products').send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(2);
  });

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server)
      .post('/api/products')
      .send({ name: 'Teclado Mecánico', price: 0 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
  });

  it('should validate that the price is a number', async () => {
    const response = await request(server)
      .post('/api/products')
      .send({ name: 'Teclado Mecánico', price: 'docientos' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
  });

  it('should create a new product', async () => {
    const response = await request(server)
      .post('/api/products')
      .send({ name: 'Mouse Testing', price: '500' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.name).toBe('Mouse Testing');
    expect(response.body.data.price).toBe(500);
    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET /api/products', () => {
  it('should check if the /api/products URL exists', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).not.toBe(404);
  });

  it('should return a JSON response containing a list of products', async () => {
    const response = await request(server).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body).not.toHaveProperty('errors');
  });
});

describe('GET /api/products/:id', () => {
  it('should return a 404 response for a non-existent product', async () => {
    const productId = 2000;

    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Product not found.');
  });

  it('should return a 400 response for an invalid ID format', async () => {
    const response = await request(server).get('/api/products/not-valid-url');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
  });

  it('should return a JSON response for a valid product ID', async () => {
    const response = await request(server).get('/api/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.id).toBe(1);
  });
});

describe('PUT /api/products/:id', () => {
  it('should return a 400 error when the provided ID in the URL is not valid', async () => {
    const response = await request(server)
      .put('/api/products/not-valid-url')
      .send({ name: 'Monitor Test', isAvailable: true, price: 1000 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
  });

  it('should return validation errors when attempting to update a product with no data', async () => {
    const response = await request(server).put('/api/products/1').send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should return a 400 error if the price is not greater than 0 when updating a product', async () => {
    const response = await request(server)
      .put('/api/products/1')
      .send({ name: 'Monitor Test', isAvailable: true, price: 0 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(Array.isArray(response.body.errors)).toBe(true);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should return a 404 error when trying to update a non-existent product', async () => {
    const productId = 2000;
    const response = await request(server)
      .put(`/api/products/${productId}`)
      .send({ name: 'Monitor Test', isAvailable: true, price: 50 });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Product not found.');
    expect(response.body).not.toHaveProperty('data');
  });

  it('should successfully update an existing product with valid data', async () => {
    const response = await request(server)
      .put('/api/products/1')
      .send({ name: 'Monitor Curvo 24', isAvailable: true, price: 500 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.id).toBe(1);
    expect(response.body.message).toBe('Product updated successfully.');
    expect(response.body).not.toHaveProperty('error');
  });
});

describe('PATCH /api/products/:id', () => {
  it('should return a 404 response for a non-existing product', async () => {
    const productId = 2000;
    const response = await request(server).patch(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Product not found.');
  });

  it('should update the product availability', async () => {
    const response = await request(server)
      .patch('/api/products/1')
      .send({ isAvailable: false });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('isAvailable');
    expect(response.body.data.isAvailable).toBe(false);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      'Product availability updated successfully.'
    );
  });

  it('should toggle the product availability when isAvailable is not provided', async () => {
    const responseBefore = await request(server).get('/api/products/1');
    const initialAvailability = responseBefore.body.data.isAvailable;

    const response = await request(server).patch('/api/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.isAvailable).toBe(!initialAvailability);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe(
      'Product availability updated successfully.'
    );
  });
});

describe('DELETE /api/products/:ID', () => {
  it('should check a valid ID ', async () => {
    const response = await request(server).delete('/api/products/not-valid');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should return a 404 response for a non-existent product', async () => {
    const productId = 2000;
    const response = await request(server).delete(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Product not found.');
  });

  it('should delete a product', async () => {
    const response = await request(server).delete('/api/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Product removed successfully.');
  });
});
