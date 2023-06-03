import { NextFunction, Request, Response } from 'express'
import { createUser } from './users.service'

export const createUserToDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (error: any) {
    next(error)
  }
}
