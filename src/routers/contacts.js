import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as contactsControllers from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(contactsControllers.getAll));

router.get('/contacts/:contactId', ctrlWrapper(contactsControllers.getById));

router.post('/contacts', ctrlWrapper(contactsControllers.create));

router.patch('/contacts/:contactId', ctrlWrapper(contactsControllers.update));

router.delete(
  '/contacts/:contactId',
  ctrlWrapper(contactsControllers.deleteOne),
);

export default router;
