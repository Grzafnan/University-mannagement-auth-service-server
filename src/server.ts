/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

async function run() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connection established.')
    app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}.`)
    })
  } catch (error) {
    errorLogger.error((error as Error).message)
  }
}

//* Start the server
run()
