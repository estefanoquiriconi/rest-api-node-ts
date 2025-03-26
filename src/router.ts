import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './middlewares'
import { createProduct, getProducts } from './handlers/products'

const router: Router = Router()

router.get('/', getProducts)

router.post(
  '/',
  body('name')
    .notEmpty()
    .isString()
    .withMessage('El nombre del producto no puede ir vació'),

  body('price')
    .isEmpty()
    .withMessage('El precio del producto no puede ir vacío')
    .isNumeric()
    .withMessage('Valor no válido')
    .custom((value) => value > 0)
    .withMessage('Precio no válido'),
  handleInputErrors,
  createProduct
)

export default router
