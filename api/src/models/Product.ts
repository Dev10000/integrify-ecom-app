import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  brand: string
  name: string
  price: number
  price_special: number
  format: string
  tags: [string]
  category: string
  image_url: string
}

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    index: true,
  },
  name: {
    type: String,
    index: true,
  },
  price: {
    type: Number,
  },
  price_special: {
    type: Number,
  },
  format: {
    type: String,
  },
  tags: [String],
  category: {
    type: String,
  },
  image_url: {
    type: String,
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
