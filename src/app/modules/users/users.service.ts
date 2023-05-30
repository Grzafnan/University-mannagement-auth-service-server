import { IUser } from './users.interface'
import User from './users.model'

export const createUser = async (payload: IUser): Promise<IUser> => {
  const newUser = new User(payload)
  await newUser.save()
  return newUser
}
