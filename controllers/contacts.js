const { contactSchema } = require('../schemas/contacts');
const { validation } = require('../middelwares');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    const error = new Error('missing required name field');
    error.status = 400;
    throw error;
  }
  validation(contactSchema);
  //   const { error } = contactSchema.validate(req.body);
  //   if (error) {
  //     error.status = 400;
  //     throw error;
  //   }

  const contact = await addContact(req.body);
  res.status(201).json(contact);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.status(200).json({ message: 'contact deleted' });
};

const updateById = async (req, res) => {
  const bodyData = Object.keys(req.body);
  if (bodyData.length === 0) {
    const error = new Error('missing fields');
    error.status = 400;
    throw error;
  }
  validation(contactSchema);
  //   const { error } = contactSchema.validate(req.body);
  //   if (error) {
  //     error.status = 400;
  //     throw error;
  //   }
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) {
    const error = new Error('Not found');
    error.status = 404;
    throw error;
  }
  res.status(200).json(contact);
};

module.exports = { getAll, getById, add, updateById, removeById };
