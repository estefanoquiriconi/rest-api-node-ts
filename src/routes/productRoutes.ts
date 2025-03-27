import { Router } from 'express';
import { handleInputErrors } from '../middlewares';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from '../handlers/products';
import {
  validateId,
  validateProductCreation,
  validateProductUpdate,
} from '../validators/productValidators';

const router: Router = Router();

router.get('/', getProducts);

router.get('/:id', validateId, handleInputErrors, getProductById);

router.post('/', validateProductCreation, handleInputErrors, createProduct);

router.put(
  '/:id',
  validateId,
  validateProductUpdate,
  handleInputErrors,
  updateProduct
);

router.patch('/:id', validateId, handleInputErrors, updateAvailability);

router.delete('/:id', validateId, handleInputErrors, deleteProduct);

export default router;
