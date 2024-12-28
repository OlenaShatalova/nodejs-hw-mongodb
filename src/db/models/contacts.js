import { Schema, model } from 'mongoose';

const contactsSchema = new Schema(
  {
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
    },
    contactType: {
      type: String,
      enam: ['work', 'home', 'personal'],
      default: 'personal',
      },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('Contact', contactsSchema);
