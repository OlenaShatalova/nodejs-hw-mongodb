import { ContactsCollection } from '../db/models/contacts.js';

export const getAll = () => {
  return ContactsCollection.find();
};

export const getById = (contactId) => {
  return ContactsCollection.findById(contactId);
};

export const create = (payload) => {
  return ContactsCollection.create(payload);
};

export const update = (contactId, payload, options = { new: true }) => {
  return ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    options,
  );
};

export const deleteOne = (contactId) => {
  return ContactsCollection.findOneAndDelete({ _id: contactId });
};
