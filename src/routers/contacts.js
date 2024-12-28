import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as contactsControllers from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(contactsControllers.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(contactsControllers.getById));

router.post('/', validateBody(createContactSchema), ctrlWrapper(contactsControllers.create));

router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(contactsControllers.update));

router.delete('/:contactId', isValidId, ctrlWrapper(contactsControllers.deleteOne));

export default router;
