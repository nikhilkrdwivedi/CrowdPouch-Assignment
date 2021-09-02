import Joi from 'joi';
import error from './errorResponse.js';

export const registerValidation = (req, res, next) => {
    
  const reqBodySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const reqBodyValidation = reqBodySchema.validate(req.body);

  if (reqBodyValidation.error) {
    error(reqBodyValidation.error, res);
  } else {
    next();
  }
};

export const loginValidation = (req, res, next) => {

    const reqBodySchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
  
    const reqBodyValidation = reqBodySchema.validate(req.body);
  
    if (reqBodyValidation.error) {
      error(reqBodyValidation.error, res);
    } else {
      next();
    }
  };

export default {
    registerValidation,
    loginValidation,
};

