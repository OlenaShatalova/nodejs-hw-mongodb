import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import * as contactsControllers from '../controllers/contacts.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(contactsControllers.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(contactsControllers.getById));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(contactsControllers.create),
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(contactsControllers.update),
);

router.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsControllers.deleteOne),
);

export default router;
