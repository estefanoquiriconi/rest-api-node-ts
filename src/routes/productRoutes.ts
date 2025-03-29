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
/**
 * @swagger
 * components:
 *    schemas:
 *      Product:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            description: The Product ID
 *            example: 1
 *          name:
 *            type: string
 *            description: The Product name
 *            example: Monitor Curvo de 24 pulgadas
 *          price:
 *            type: number
 *            description: The Product price
 *            example: 300
 *          isAvailable:
 *            type: boolean
 *            description: The Product availability
 *            example: true
 *
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *        summary: Get a list of products
 *        tags:
 *          - Products
 *        description: Return a list of products
 *        responses:
 *          200:
 *            description: Successful response
 *            content:
 *              application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Product'
 *
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *        - Products
 *    description: Return a product based on its unique ID
 *    parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *    responses:
 *      200:
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid ID
 *      404:
 *        description: Product not found
 *
 *
 *
 */
router.get('/:id', validateId, handleInputErrors, getProductById);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Create a new product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the product
 *                example: "Monitor Curvo 24 pulgadas"
 *              price:
 *                type: number
 *                description: The price of the product
 *                example: 700
 *              isAvailable:
 *                type: boolean
 *                description: Availability status of the product
 *                example: true
 *                nullable: true
 *    responses:
 *      201:
 *        description: Product created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid input
 */
router.post('/', validateProductCreation, handleInputErrors, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update an existing product
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to update
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: The name of the product
 *              price:
 *                type: number
 *                description: The price of the product
 *              isAvailable:
 *                type: boolean
 *                description: Availability status of the product
 *    responses:
 *      200:
 *        description: Product updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid input
 *      404:
 *        description: Product not found
 */
router.put(
  '/:id',
  validateId,
  validateProductUpdate,
  handleInputErrors,
  updateProduct
);
/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update the availability status of a product
 *    tags:
 *      - Products
 *    description: Update the availability status of a product based on its unique ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to update availability
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              isAvailable:
 *                type: boolean
 *                description: New availability status of the product
 *    responses:
 *      200:
 *        description: Product availability updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad Request - Invalid input
 *      404:
 *        description: Product not found
 */
router.patch('/:id', validateId, handleInputErrors, updateAvailability);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product
 *    tags:
 *      - Products
 *    description: Remove a product from the inventory based on its unique ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to delete
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Product removed successfully
 *      404:
 *        description: Product not found
 */
router.delete('/:id', validateId, handleInputErrors, deleteProduct);

export default router;
