import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function run() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database connection established.')
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}.`)
    })
  } catch (error) {
    console.log((error as Error).message)
  }
}

//* Start the server
run()
