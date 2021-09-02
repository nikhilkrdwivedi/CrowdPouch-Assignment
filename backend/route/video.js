import express from 'express';
const videoRoutes = express.Router();
import {loginValidation, registerValidation} from '../middleware/requestValidations/auth.js';
import {uploadVideo,getVideos} from '../controller/video.js';
import { validateToken } from '../middleware/security/index.js';
// authRoutes.post('/login',loginValidation, login);
videoRoutes.post('/upload',validateToken, uploadVideo);
videoRoutes.get('/',validateToken, getVideos);

export default videoRoutes;