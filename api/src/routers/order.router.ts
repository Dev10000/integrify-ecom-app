import express from 'express'

import {
  createOrder,
  findById,
  // deleteUser,
  findAll,
  // updateUser,
  // findByUserEmail,
} from '../controllers/order.controller'

const router = express.Router()

// Every path we define here will get /api/v1/orders prefix
router.get('/', findAll)
router.get('/:orderId', findById)
// router.get('/:userEmail', findByUserEmail)
// router.put('/:userId', updateUser)
// router.delete('/:userId', deleteUser)
router.post('/', createOrder)

export default router
