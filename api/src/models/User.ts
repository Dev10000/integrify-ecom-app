import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  role: 'CUSTOMER' | 'SELLER' | 'ADMIN'
  orders: string[] // TODO order type
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
    unique: true,
  },
  imageUrl: {
    type: String,
  },
  role: {
    type: String,
    default: 'CUSTOMER',
    required: true,
  },
  orders: [String],
})

export default mongoose.model<UserDocument>('User', userSchema)
