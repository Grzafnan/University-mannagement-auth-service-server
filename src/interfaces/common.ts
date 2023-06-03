import { IGenericErrorMessage } from './error'

export type IGenericErrorResponse = {
  statusCode: string | number
  message: string
  errorMessages: IGenericErrorMessage[]
}
