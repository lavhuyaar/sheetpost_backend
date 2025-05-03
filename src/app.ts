import express, { Request } from 'express';
import cors from 'cors';

import { errorHandler } from './middlewares/errorHandler';
import authorRoutes from './routes/authorRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

const allowedLists: (string | undefined)[] = [
  'https://sheetpost-admin.vercel.app',
  'https://sheetpost.vercel.app',
];

const corsOptionsDelegate = (req: Request, callback: Function) => {
  let corsOptions;
  if (allowedLists.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

//Routes
app.use('/', authorRoutes);
app.use('/', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

//Global error handler
app.use(errorHandler);

export default app;
