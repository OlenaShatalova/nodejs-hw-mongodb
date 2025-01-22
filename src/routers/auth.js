import { Router } from 'express';

import * as authControllers from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import * as schema from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(schema.authRegister),
  ctrlWrapper(authControllers.registerCtrl),
);

authRouter.post(
  '/login',
  validateBody(schema.authLogin),
  ctrlWrapper(authControllers.loginCtrl),
);

authRouter.post('/refresh', ctrlWrapper(authControllers.refreshTokenCtrl));

authRouter.post('/logout', ctrlWrapper(authControllers.logoutCtrl));

authRouter.post(
  '/send-reset-email',
  validateBody(schema.requestResetEmail),
  ctrlWrapper(authControllers.requestResetEmailCtrl),
);

authRouter.post(
  '/reset-pwd',
  validateBody(schema.resetPassword),
  ctrlWrapper(authControllers.resetPasswordCtrl),
);
export default authRouter;
