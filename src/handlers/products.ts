import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [['price', 'DESC']],
    limit: 3,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  res.json({ data: products, message: 'Products retrieved successfully.' });
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({
      error: 'Product not found.',
      message: `No product found with the ID: ${id}.`,
    });
    return;
  }

  res.json({ data: product, message: 'Product retrieved successfully.' });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await Product.create(req.body);
  res
    .status(201)
    .json({ data: product, message: 'Product created successfully.' });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: 'Product not found.',
      message: 'No product found with the specified ID for update.',
    });
    return;
  }

  const updatedProduct = await (await product.update(req.body)).save();
  res.json({ data: updatedProduct, message: 'Product updated successfully.' });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: 'Product not found.',
      message: 'No product found with the specified ID to update availability.',
    });
    return;
  }

  const { isAvailable } = req.body;

  if (isAvailable !== undefined) {
    product.isAvailable = req.body.isAvailable;
  } else {
    product.isAvailable = !product.isAvailable;
  }

  await product.save();
  res.json({
    data: product,
    message: 'Product availability updated successfully.',
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({
      error: 'Product not found.',
      message: 'No product found with the specified ID to delete.',
    });
    return;
  }

  await product.destroy();
  res.status(200).json({ message: 'Product removed successfully.' });
};
