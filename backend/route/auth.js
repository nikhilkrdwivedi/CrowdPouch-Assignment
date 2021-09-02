import express from 'express';
const authRoutes = express.Router();
import {loginValidation, registerValidation} from '../middleware/requestValidations/auth.js';
import {login,register} from '../controller/auth.js';

authRoutes.post('/login',loginValidation, login);
authRoutes.post('/register',registerValidation, register);

export default authRoutes;