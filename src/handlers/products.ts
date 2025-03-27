import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['price', 'DESC']],
      limit: 3,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    res.json({ data: products });
  } catch (err) {
    console.error(err);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    res.json({ data: product });
  } catch (err) {
    console.error(err);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  const updatedProduct = await (await product.update(req.body)).save();

  res.json({ data: updatedProduct });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  const { isAvailable } = req.body;

  if (isAvailable !== undefined) {
    product.isAvailable = req.body.isAvailable;
  } else {
    product.isAvailable = !product.isAvailable;
  }

  await product.save();

  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    res.status(404).json({ message: 'Not found' });
    return;
  }

  product.destroy();
  res.status(200).json({ message: 'Product removed' });
};
