import express from 'express';
const authRoutes = express.Router();
import {loginValidation, registerValidation} from '../middleware/requestValidations/auth.js'
import { validateToken } from '../middleware/security/index.js';
import {getCities,getCitiesWithMaxPopulation} from '../controller/city.js';

authRoutes.get('/city-info',validateToken, getCities);
authRoutes.get('/ordered-cities-populations',validateToken, getCitiesWithMaxPopulation);
// authRoutes.get('/register',validateToken, register);

export default authRoutes;