import express, { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';

const app = express();
app.use(express.json());

//Routes
app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

//Global error handler
app.use(errorHandler);

export default app;
