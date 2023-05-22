const fs = require("fs/promises");
const path = require("path");
const argv = require("yargs").argv;

const contacts = require("./db");

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      console.log(contactList);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if (!contact) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const newContactList = await contacts.removeContact(id);
      console.log(newContactList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const id = "qdggE76Jtbfd9eWJHrssH";
invokeAction({ action: "get", id });
invokeAction();

// invokeAction(argv);
