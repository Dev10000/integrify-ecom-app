import mongoose, { Document } from 'mongoose'

export type CustomerDocument = Document & {
  _id?: mongoose.Schema.Types.ObjectId
  email: string
  isAdmin: boolean
}

const customerSchema = new mongoose.Schema({
  email: {
    type: String,
    index: true,
  },

  isAdmin: {
    type: Boolean,
  },
})

export default mongoose.model<CustomerDocument>('Customer', customerSchema)
