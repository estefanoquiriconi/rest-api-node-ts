import request from 'supertest';
import server from '../../server';

describe('POST api/productos', () => {
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

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty('errors');
  });
});
