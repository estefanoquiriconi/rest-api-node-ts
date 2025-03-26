import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['price', 'DESC']],
      limit: 3,
    })
    res.json({ data: products })
  } catch (err) {
    console.error(err)
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body)

    res.json({ data: product })
  } catch (err) {
    console.error(err)
  }
}
