import Joi from 'joi';

import { EMAIL_REGEX } from '../constants/users.js';

export const authRegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(6).required(),
});

export const authLogin = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required(),
  password: Joi.string().min(6).required(),
});

export const requestResetEmail = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required(),
});

export const resetPassword = Joi.object({
  password: Joi.string().min(6).required(),
  token: Joi.string().required(),
});
