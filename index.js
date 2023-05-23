const { argv } = require("yargs");
const { Command } = require("commander");

const program = new Command();

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
      const deleteContact = await removeContact(id);
      console.log(`This contact was delete:`, deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "type operation")
  .option("-id, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

invokeAction(options);
