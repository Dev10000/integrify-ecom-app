import Product, { ProductDocument } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'

const create = async (product: ProductDocument): Promise<ProductDocument> =>
  product.save()

const findById = async (productId: string): Promise<ProductDocument> => {
  const foundProduct = await Product.findById(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Movie ${productId} not found`)
  }

  return foundProduct
}

const findAll = async (): Promise<ProductDocument[]> =>
  Product.find({}, { name: 1, brand: 1, price: 1, image_url: 1 })
    .limit(5000)
    .sort({ name: 1 })
    .lean()

const update = async (
  productId: string,
  updateObject: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(
    productId,
    updateObject,
    {
      new: true,
    }
  )

  if (!foundProduct) {
    throw new NotFoundError(`Movie ${productId} not found`)
  }

  return foundProduct
}

const deleteProduct = async (
  productId: string
): Promise<ProductDocument | null> => {
  const foundProduct = Product.findByIdAndDelete(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Movie ${productId} not found`)
  }

  return foundProduct
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteProduct,
}
