import { Request, Response } from 'express'
import { createUser } from './users.service'

export const createUserToDB = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: user,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}
