import express from 'express'

import {
  createProduct,
  findById,
  deleteProduct,
  findAll,
  updateProduct,
  searchProduct,
  autocomplete,
  categories,
  getProductsByCategory,
} from '../controllers/product.controller'

const router = express.Router()

// Every path we define here will get /api/v1/products prefix

router.get('/', findAll)
router.post('/', createProduct)
router.get('/:productId', findById)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)
router.get('/search/:query', searchProduct)
router.get('/autocomplete/:query', autocomplete)
router.get('/categories/all', categories)
router.get('/categories/:category', getProductsByCategory)

export default router
