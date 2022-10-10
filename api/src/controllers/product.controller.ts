import { Request, Response, NextFunction } from 'express'

import Product from '../models/Product'
import productService from '../services/product.service'
import { BadRequestError } from '../helpers/apiError'

// POST /products
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      brand,
      name,
      price,
      price_special: priceSpecial, // Eslint typescript rule variable name: camelCase, PascalCase, UPPER_CASE
      format,
      tags,
      category,
      image_url: imageUrl, // Eslint typescript rule variable name: camelCase, PascalCase, UPPER_CASE
    } = req.body

    const product = new Product({
      brand,
      name,
      price,
      price_special: priceSpecial,
      format,
      tags,
      category,
      image_url: imageUrl,
    })

    await productService.create(product)
    res.json(product)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /products/:productId
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params
    const mongooseQueryObject = await productService.update(productId, req.body)
    res.json(mongooseQueryObject)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /products/:productId
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productService.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /prodcuts/:productId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.findById(req.params.productId))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /products
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /prodcuts/search:query
export const searchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.searchProduct(req.params.query))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /prodcuts/autocomplete:query
export const autocomplete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.autocomplete(req.params.query))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /prodcuts/categories/all
export const categories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.categories())
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /prodcuts/categories/:category
export const getProductsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.getProductsByCategory(req.params.category))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
