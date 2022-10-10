import mongoose, { Document } from 'mongoose'

export type CustomerDocument = Document & {
  name: string
  email: string
  image: string
  isAdmin: boolean
}

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    index: true,
  },
  image: {
    type: String,
  },

  isAdmin: {
    type: Boolean,
  },
})

export default mongoose.model<CustomerDocument>('Customer', customerSchema)
