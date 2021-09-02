import express from 'express';
const globalRoute = express.Router();

// Routes import statements
import authRoutes from './auth.js';
import cityRoutes from './city.js';
import videoRoutes from './video.js';

globalRoute.use('/auth',authRoutes);
globalRoute.use('/city',cityRoutes);
globalRoute.use('/video',videoRoutes);

export default globalRoute;