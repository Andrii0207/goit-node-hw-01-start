const { argv } = require("yargs");
const { program } = require("commander");

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
  .option("-a, --action <type>", "product operation")
  .option("-id, --id <type>", "product id")
  .option("-n, --name <type>", "product name")
  .option("-e, --email <type>", "product email")
  .option("-p, --phone <type>", "product phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options);
