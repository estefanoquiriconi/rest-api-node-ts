import { param } from 'express-validator';

import { body } from 'express-validator';

export const validateId = [
  param('id')
    .isInt()
    .withMessage('El id debe ser numérico')
    .bail()
    .custom((value) => value > 0)
    .withMessage('El id debe ser mayor a 0'),
];

export const validateProductCreation = [
  body('name')
    .notEmpty()
    .isString()
    .withMessage('El nombre del producto no puede ir vació'),
  body('price')
    .notEmpty()
    .withMessage('El precio del producto no puede ir vacío')
    .isNumeric()
    .withMessage('Valor no válido')
    .custom((value) => value > 0)
    .withMessage('Precio no válido'),
];

export const validateProductUpdate = [
  ...validateProductCreation,
  body('isAvailable')
    .isBoolean()
    .withMessage('Valor para disponibilidad no válido'),
];
