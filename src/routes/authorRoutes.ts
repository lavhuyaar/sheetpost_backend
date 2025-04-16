import { Router } from 'express';
import { loginAuthor, signUpAuthor } from '../controllers/authorController';
const authorRoutes = Router();

authorRoutes.post('/signUpAdmin', signUpAuthor);
authorRoutes.post('/loginAdmin', loginAuthor);

export default authorRoutes;
