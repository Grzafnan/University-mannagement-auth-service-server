import { Error } from 'mongoose'

export type CustomError = Error.ValidationError & {
  name: string
  stack?: string
}

export type IGenericErrorMessage = {
  path: string
  message: string
}
