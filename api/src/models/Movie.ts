import mongoose, { Document } from 'mongoose'

export type MovieDocument = Document & {
  title: string
  year: number
  genres: string[]
  runtime: number
  rating: number
  characters: string[]
}

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
  },
  year: {
    type: Number,
    required: true,
    min: 0,
  },
  genres: [String],
  runtime: {
    type: Number,
    required: true,
    min: 1,
  },
  rating: {
    type: Number,
    min: 0,
  },
  characters: [String],
})

export default mongoose.model<MovieDocument>('Movie', movieSchema)
