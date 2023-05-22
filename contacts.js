const fs = require("fs/promises");
const path = require("path");
// const { nanoid } = require("nanoid");

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
// getContactById("qdggE76Jtbfd9eWJHrssH");

async function removeContact(contactId) {
  const contactList = listContacts();
  const newContactList = contactList.filter((item) => item.id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  const contactList = await listContacts();
  const newContact = { id: "qdggE76Jtbfd9eWJHrssH", name, email, phone };
  contactList.push(newContact);
  try {
    await fs.readFile(contactsPath, JSON.stringify(contactList, null, 2));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
