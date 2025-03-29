import express, { Express } from 'express';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUIOptions } from './config/swagger';
import productRoutes from './routes/productRoutes';

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
  } catch (error) {
    console.error('Hubo un error al conectar a la DB');
  }
}

connectDB();

const server: Express = express();

server.use(express.json());

server.use('/api/products', productRoutes);

server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

export default server;
