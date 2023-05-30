import { Schema, model } from 'mongoose'
import { IUser } from './users.interface'

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = model<IUser>('User', userSchema)

export default User
