import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';

const app: Application = express();
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', 'views');

//* Using Cors
app.use(cors());

//* Parse Data
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//* User routes
app.use('/api/v1', routes);

// Home GET route
app.get('/', async (req: Request, res: Response) => {
  const serverStatus: {
    online: boolean;
    message: string;
  } = {
    online: true,
    message:
      'Welcome to Landed University Auth Management server is up and running!',
  };

  // Determine the server status based on the HTTP response status
  if (res.statusCode !== httpStatus.OK) {
    serverStatus.online = false;
    serverStatus.message = 'Server is currently offline.';
  }

  res.render('status', { serverStatus });
});

//* Resource not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).render('404', {
    error: {
      path: req.originalUrl,
    },
  });
  next();
});

// //* Global Error Handler
app.use(globalErrorHandler);

export default app;
