const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

/*
 * Раскомментируй и запиши значение
 * const contactsPath = path.join(__dirname, "./db/contacts.json");
 */
// fs.readFile(contactsPath, "utf-8")
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  return contactList.find(({ id }) => id === contactId);
}

getContactById("qdggE76Jtbfd9eWJHrssH");

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = { listContacts, getContactById };
