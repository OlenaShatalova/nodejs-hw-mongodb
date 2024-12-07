import * as contactsServices from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await contactsServices.getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};


export const getContactByIdController = async (req, res) => {
  const id = req.params.id;
  const contact = await contactsServices.getContactsById(id);

  if (!contact) {
    return res.status(404).json({
      message: 'Contact not found',
    });
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}`,
    data: contact,
  });
};
