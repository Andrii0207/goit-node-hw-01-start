const fs = require("fs/promises");
const argv = require("yargs").argv;

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts.js");

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await listContacts();
      console.table(contactList);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Product with id=${id} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log("newContact:", newContact);
      break;

    case "remove":
      const newContactList = await removeContact(id);
      if (!newContactList) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.log("Contact was delete");
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const newData = {
  name: "Winnie Pooh",
  email: "WinniePooh.net",
  phone: "(123) 456-7890",
};
const id = "qdggE76Jtbfd9eWJHrssH";
const deleteId = "T3U_NIDwUnK1awMIQrk9R";

// invokeAction({ action: "get", id });
// invokeAction({ action: "list" });
// invokeAction({
//   action: "add",
//   name: "Winnie Pooh",
//   email: "WinniePooh.net",
//   phone: "(123) 456-7890",
// });
// invokeAction({ action: "remove", id: deleteId });

invokeAction(argv);
