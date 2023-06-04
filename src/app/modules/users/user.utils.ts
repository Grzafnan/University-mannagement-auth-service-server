import User from './user.model'

export const findLastUser = async (): Promise<string | undefined> => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return user?.id
}

export const generateUserId = async (): Promise<string> => {
  const lastUserId = await findLastUser()
  const nextId = (Number(lastUserId) + 1 || 1).toString().padStart(5, '0')
  return nextId
}
