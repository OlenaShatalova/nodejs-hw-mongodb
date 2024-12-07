import { Schema, model } from 'mongoose';

 const contactsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  isFavourite: {
    type: Boolean,
    default: false,
    required: true,
  },
  contactType: {
    type: String,
    enam: ['work', 'home', 'personal'],
    default: 'personal',
    required: true,
  },
}, {
    timestamps: true,
});

export const ContactsCollection = model('contact', contactsSchema);
