import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

//* Using Cors
app.use(cors())

//* Parse Data
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//* GET method route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from server!')
})

//* Resource not found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'No route found!',
  })
})

//* Error Handler
app.use((err: any, req: Request, res: any) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

export default app
