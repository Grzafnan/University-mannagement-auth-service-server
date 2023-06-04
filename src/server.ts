/* eslint-disable no-console */
import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { Server } from 'http'
import { logger, errorLogger } from './shared/logger'

async function run() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connection established.')

    server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}.`)
    })
  } catch (error) {
    errorLogger.error('Failed to connect the Database!!!', error)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection is detected, we are closing the server...')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

//* Start the server
run()
