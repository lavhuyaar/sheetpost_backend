import express from 'express';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());

//Global error handler
app.use(errorHandler);

export default app;
