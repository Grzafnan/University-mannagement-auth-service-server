import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRoute from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
const app: Application = express()

//* Using Cors
app.use(cors())

//* Parse Data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//* User routes
app.use('/api/v1/users', userRoute)

//* GET method route
app.get('/', (req: Request, res: Response) => {
  res.send(
    `<h1 style="color:#1F4D90;font-size:2rem;text-align:center;background:#0D1117;height:100vh;">Hello from server! :-)</h1>`
  )
})

//* Resource not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'No route found!',
  })
})

// //* Global Error Handler
app.use(globalErrorHandler)

export default app
