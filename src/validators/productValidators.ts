import { param } from 'express-validator';
import { body } from 'express-validator';

export const validateId = [
  param('id')
    .isInt()
    .withMessage('El ID debe ser un número entero.')
    .bail()
    .custom((value) => value > 0)
    .withMessage('El ID debe ser mayor a 0.'),
];

export const validateProductCreation = [
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto no puede estar vacío.'),
  body('price')
    .notEmpty()
    .withMessage('El precio no puede estar vacío.')
    .bail()
    .isNumeric()
    .withMessage('El precio debe ser un número.')
    .bail()
    .custom((value) => value > 0)
    .withMessage('El precio debe ser mayor a 0.'),
];

export const validateProductUpdate = [
  ...validateProductCreation,
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('El valor de disponibilidad debe ser verdadero o falso.'),
];
