import { Router } from 'express';
const authRoutes = Router();

//Incomplete routes
authRoutes.post('/signUp');
authRoutes.post('/login');
authRoutes.post('/loginAsAdmin');

export default authRoutes;
