import { Router } from 'express';

import * as contactsControllers from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', contactsControllers.getContactsController);

router.get('/contacts/:id', contactsControllers.getContactByIdController);

export default router;
