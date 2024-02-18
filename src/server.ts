/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function run() {
  try {
    await RedisClient.connect();
    await mongoose.connect(config.database_url as string);
    logger.info('Database connection established.');

    server = app.listen(config.port, () => {
      logger.info(`Server is running on port ${config.port}.`);
    });
  } catch (error) {
    errorLogger.error('Failed to connect the Database!!!', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

//* Start the server
run();

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }
});
