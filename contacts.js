const fs = require("fs/promises");
const { nanoid } = require("nanoid");
// const { v4 } = require("uuid");

const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  const contact = contactList.find(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contactList = await listContacts();
  const index = contactList.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deleteContact] = contactList.splice(index, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    return deleteContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  const contactList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactList.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
