import Order, { OrderDocument } from '../models/Order'
import { NotFoundError } from '../helpers/apiError'

const create = async (order: OrderDocument): Promise<OrderDocument> =>
  order.save()

const findById = async (orderId: string): Promise<OrderDocument> => {
  const foundOrder = await Order.findById(orderId)

  if (!foundOrder) {
    throw new NotFoundError(`order ${orderId} not found`)
  }

  return foundOrder
}

const findByUserEmail = async (userEmail: string): Promise<OrderDocument[]> => {
  const foundOrder = await Order.find({ userEmail: userEmail })

  if (!foundOrder) {
    throw new NotFoundError(`orders for ${userEmail} not found`)
  }

  return foundOrder
}

const findAll = async (): Promise<OrderDocument[]> =>
  Order.find({}).limit(5000).sort({ title: 1 }).lean()

// const update = async (
//   orderId: string,
//   updateObject: Partial<orderDocument>
// ): Promise<orderDocument | null> => {
//   const foundOrder = await order.findByIdAndUpdate(orderId, updateObject, {
//     new: true,
//   })

//   if (!foundOrder) {
//     throw new NotFoundError(`order ${orderId} not found`)
//   }

//   return foundOrder
// }

// const deleteorder = async (orderId: string): Promise<orderDocument | null> => {
//   const foundOrder = order.findByIdAndDelete(orderId)

//   if (!foundOrder) {
//     throw new NotFoundError(`order ${orderId} not found`)
//   }

//   return foundOrder
// }

export default {
  create,
  findById,
  findAll,
  findByUserEmail,
  // update,
  // deleteorder,
}
