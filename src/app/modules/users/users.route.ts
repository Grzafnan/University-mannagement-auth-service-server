import express from 'express'
import { createUserToDB } from './users.controller'
const router = express.Router()

router.post('/create', createUserToDB)

export default router
