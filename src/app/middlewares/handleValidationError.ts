import { Error } from 'mongoose'
import { IGenericErrorMessage } from '../../interfaces/error'

export const handleValidationError = (
  err: Error.ValidationError
): IGenericErrorMessage[] => {
  const simplifiedError: IGenericErrorMessage[] = Object.keys(err.errors).map(
    (key: string) => {
      const error: Error.ValidatorError | Error.CastError = err.errors[key]
      if (error instanceof Error.ValidatorError) {
        return {
          path: error?.path,
          message: error?.message,
        }
      } else {
        // Handle the case of CastError separately
        return {
          path: error?.path,
          message: error?.stringValue,
        }
      }
    }
  )

  return simplifiedError
}
