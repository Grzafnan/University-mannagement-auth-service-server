import User from './users.model'

export const findLastUser = async (): Promise<string | undefined> => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return user?.id
}

export const generateUserId = async (): Promise<string> => {
  const id = (await findLastUser()) || (0).toString().padStart(5, '0')
  return id
}
