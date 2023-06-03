import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { CustomError, IGenericErrorMessage } from '../../interfaces/error'
import { handleValidationError } from './handleValidationError'
import { logger } from '../../shared/logger'

const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(err)
  res.status(400).json({ error: err })

  const statusCode = 500
  const message = 'Generic error occurred'
  const errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    logger.error(simplifiedError)
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })

  next()
}

export default globalErrorHandler
