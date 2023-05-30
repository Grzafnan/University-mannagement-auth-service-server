import { Request, Response } from 'express'
import { createUser } from './users.service'

export const createUserToDB = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)
    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
