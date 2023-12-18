import express, {Request, Response} from 'express';
import { verifyToken } from '../controllers/authController';
import * as authService from '../services/authService';
import * as authController from '../controllers/authController';

const authRouter = express.Router();

// Rota para realizar login
authRouter.post('/login',authController.login);

// Rota para criar um novo usuário
authRouter.post('/register', authController.register)

export default authRouter;
