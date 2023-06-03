import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './users.interface'
import User from './users.model'
import { generateUserId } from './users.utils'

export const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  user.id = await generateUserId()

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!')
  }
  return createdUser
}
