import { Request, Response, NextFunction } from 'express'

import Order from '../models/Order'
import orderService from '../services/order.service'
import { BadRequestError } from '../helpers/apiError'

// POST /orders
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userEmail, amount, amountShipping, images, stripeId } = req.body

    const order = new Order({
      userEmail,
      stripeId,
      amount,
      amountShipping,
      images,
    })

    await orderService.create(order)
    res.json(order)
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /users/:userId
// export const updateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const update = req.body
//     const { userId } = req.params
//     const updatedUser = await orderService.update(userId, update)
//     res.json(updatedUser)
//   } catch (error) {
//     if (error instanceof Error && error.name === 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// DELETE /users/:userId
// export const deleteUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await orderService.deleteUser(req.params.userId)
//     res.status(204).end()
//   } catch (error) {
//     if (error instanceof Error && error.name === 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// GET /order/:orderId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await orderService.findById(req.params.orderId))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /order/:userEmail
export const findByUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await orderService.findByUserEmail(req.params.userEmail))
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /orders
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await orderService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
