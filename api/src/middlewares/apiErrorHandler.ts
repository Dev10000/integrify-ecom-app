import { Request, Response } from 'express'
// import { Request, Response, NextFunction } from 'express'

import ApiError from '../helpers/apiError'
import logger from '../util/logger'

export default function (
  error: ApiError | Error,
  req: Request,
  res: Response
  // next: NextFunction
) {
  if (error instanceof ApiError) {
    if (error.source) {
      logger.error(error.source)
    }
    return res.status(error.statusCode).json({
      status: 'error',
      statusCode: error.statusCode,
      message: error.message,
    })
  }
  return res.status(400).json({
    status: 'error',
    statusCode: 400,
    message: error.message,
  })
}
