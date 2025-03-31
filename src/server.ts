import express, { Express } from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
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
// Instance of express
const server: Express = express();

// Allow connections
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  },
};
server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan('dev'));

server.use('/api/products', productRoutes);

// Documentation
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUIOptions)
);

export default server;
