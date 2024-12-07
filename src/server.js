import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';
import * as contactsServices from './services/contacts.js';

const PORT = getEnvVar('PORT', 3000);

export const setupServer = () => {
  const app = express();

  // app.use(express.json());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // app.get('/', (req, res) => {
  //   res.json({
  //     message: 'Hello Olena!',
  //   });
  // });

  app.get('/contacts', async (req, res) => {
    const contacts = await contactsServices.getAllContacts();

    res.json({
      data: contacts,
    });
  });

  app.use('*', notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
