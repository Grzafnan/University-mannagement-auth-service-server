import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUserToDB: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserService.createUser(req.body)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUserToDB,
}
