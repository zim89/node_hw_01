const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find(({ id }) => id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  console.log(index);
  if (index === -1) return null;
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContactById = async (id, data) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  allContacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact,
};
