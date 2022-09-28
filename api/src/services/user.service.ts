import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => user.save()

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`user ${userId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> =>
  User.find({}, { firstName: 1, lastName: 1, email: 1, imageUrl: 1 })
    .limit(5000)
    .sort({ lastName: 1 })
    .lean()

const update = async (
  userId: string,
  updateObject: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const founduser = await User.findByIdAndUpdate(userId, updateObject, {
    new: true,
  })

  if (!founduser) {
    throw new NotFoundError(`user ${userId} not found`)
  }

  return founduser
}

const deleteuser = async (userId: string): Promise<UserDocument | null> => {
  const founduser = User.findByIdAndDelete(userId)

  if (!founduser) {
    throw new NotFoundError(`user ${userId} not found`)
  }

  return founduser
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteUser: deleteuser,
}
