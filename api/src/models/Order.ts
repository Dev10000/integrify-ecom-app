import mongoose, { Document } from 'mongoose'

export type OrderDocument = Document & {
  userEmail: string
  stripeId: string
  amount: number
  amountShipping: number
  images: string[]
}

const orderSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    stripeId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountShipping: {
      type: Number,
      required: true,
    },
    images: [String],
  },
  { timestamps: true }
)

export default mongoose.model<OrderDocument>('Order', orderSchema)
