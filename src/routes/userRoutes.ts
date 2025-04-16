import { Router } from 'express';
import { loginUser, signUpUser } from '../controllers/userController';
const userRoutes = Router();

userRoutes.post('/signUp', signUpUser);
userRoutes.post('/login', loginUser);

export default userRoutes;
