import User from './users.model'

export const findLastUser = async (): Promise<string | undefined> => {
  const user = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  console.log(user?.id)
  return user?.id
}

export const generateUserId = async (): Promise<string> => {
  const id = (Number(await findLastUser()) + 1 || '1')
    .toString()
    .padStart(5, '0')
  return id
}
