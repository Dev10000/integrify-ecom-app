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
  Product.find({ image_url: { $ne: null } })
    .limit(50)
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

const searchProduct = async (query: string): Promise<ProductDocument[]> => {
  const searchResults = Product.aggregate([
    {
      $search: {
        index: 'products',
        compound: {
          must: [
            {
              text: {
                query: query,
                path: ['name', 'brand', 'category', 'tags'],
                fuzzy: {},
              },
            },
            {
              exists: {
                path: 'price_special',
                score: {
                  boost: {
                    value: 3,
                  },
                },
              },
            },
          ],
        },
      },
    },
  ])
  return searchResults
}

const autocomplete = async (query: string): Promise<ProductDocument[]> => {
  const result = Product.aggregate([
    {
      $search: {
        index: 'autocomplete',
        autocomplete: {
          query: query,
          path: 'name',
        },
        highlight: {
          path: ['name'],
        },
      },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        name: 1,
        highlights: {
          $meta: 'searchHighlights',
        },
      },
    },
  ])
  return result
}

const categories = async (): Promise<ProductDocument[]> => {
  const categoriesResults = await Product.aggregate([
    {
      $facet: {
        categories: [
          { $match: { category: { $ne: null } } },
          { $sortByCount: '$category' },
        ],
      },
    },
  ])
  const processedResults = categoriesResults[0].categories
  return processedResults
}

const getProductsByCategory = async (
  categoryName: string
): Promise<ProductDocument[]> => {
  const results = await Product.find({ category: categoryName })

  if (!results) {
    throw new NotFoundError(`Category ${categoryName} not found`)
  }

  return results
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteProduct,
  searchProduct,
  autocomplete,
  categories,
  getProductsByCategory,
}
