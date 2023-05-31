import express from 'express'
import { createUserToDB } from './users.controller'
const router = express.Router()

router.post('/create-user', createUserToDB)

export default router
