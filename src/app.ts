import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authorRoutes from './routes/authorRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

//Routes
app.use('/', authorRoutes);
app.use('/', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

//Global error handler
app.use(errorHandler);

export default app;
