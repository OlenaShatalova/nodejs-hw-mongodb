import { Router } from 'express';

import * as authControllers from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { authRegisterSchema, authLoginSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authControllers.registerCtrl),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authControllers.loginCtrl),
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshTokenCtrl));

authRouter.post('/logout', ctrlWrapper(authControllers.logoutCtrl));

export default authRouter;
