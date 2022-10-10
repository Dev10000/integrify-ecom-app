import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import Customer from '../models/Customer'
import { JWT_SECRET } from '../util/secrets'
// import User from '../models/User'
// import userService from '../services/user.service'
import { BadRequestError } from '../helpers/apiError'

// POST /login
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('request body:::', req.body)
    console.log('request user:::', req.user)
    let name
    let email
    let image
    if (req.user) {
      ;({ name, email, picture: image } = req.user as any)
    } else ({ name, email, image } = req.body)
    console.log('test', name, email, image)

    let customer: any = await Customer.findOne({
      email: email,
    }).lean()
    console.log('lean: ', customer)
    if (!customer) {
      customer = new Customer({
        name: name,
        email: email,
        image: image,
        isAdmin: false,
      })
      customer.save()
      customer = JSON.stringify(customer)
      console.log('json string ', customer)
    }

    // const user = {
    //   id: id,
    //   name: name,
    //   email: email,
    //   image: image,
    // }
    const accessToken = jwt.sign(customer, JWT_SECRET)
    res.json({ accessToken: accessToken })
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export default login

// // POST /users
// export const createUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { firstName, lastName, email, imageUrl, role } = req.body

//     const user = new User({
//       firstName,
//       lastName,
//       email,
//       imageUrl,
//       role,
//     })

//     await userService.create(user)
//     res.json(user)
//   } catch (error) {
//     if (error instanceof Error && error.name === 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// // PUT /users/:userId
// export const updateUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const update = req.body
//     const { userId } = req.params
//     const updatedUser = await userService.update(userId, update)
//     res.json(updatedUser)
//   } catch (error) {
//     if (error instanceof Error && error.name === 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// // DELETE /users/:userId
// export const deleteUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await userService.deleteUser(req.params.userId)
//     res.status(204).end()
//   } catch (error) {
//     if (error instanceof Error && error.name === 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }

// // GET /users/:userId
// export const findById = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     res.json(await userService.findById(req.params.userId))
//   } catch (error) {
//     if (error instanceof Error && error.name === 'ValidationError') {
//       next(new BadRequestError('Invalid Request', 400, error))
//     } else {
//       next(error)
//     }
//   }
// }
