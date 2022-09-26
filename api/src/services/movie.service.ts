import Movie, { MovieDocument } from '../models/Movie'
import { NotFoundError } from '../helpers/apiError'

const create = async (movie: MovieDocument): Promise<MovieDocument> =>
  movie.save()

const findById = async (movieId: string): Promise<MovieDocument> => {
  const foundMovie = await Movie.findById(movieId)

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${movieId} not found`)
  }

  return foundMovie
}

const findAll = async (): Promise<MovieDocument[]> =>
  Movie.find({}, { title: 1, year: 1, poster: 1 })
    .limit(5000)
    .sort({ title: 1 })
    .lean()

const update = async (
  movieId: string,
  update: Partial<MovieDocument>
): Promise<MovieDocument | null> => {
  const foundMovie = await Movie.findByIdAndUpdate(movieId, update, {
    new: true,
  })

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${movieId} not found`)
  }

  return foundMovie
}

const deleteMovie = async (movieId: string): Promise<MovieDocument | null> => {
  const foundMovie = Movie.findByIdAndDelete(movieId)

  if (!foundMovie) {
    throw new NotFoundError(`Movie ${movieId} not found`)
  }

  return foundMovie
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteMovie,
}
