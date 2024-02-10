// import { program } from "commander";
const { program } = require("commander");
const Contacts = require('./contacts.js')

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allcontacts = await Contacts.listContacts();
      console.table(allcontacts);
      break;
    case "get":
      const contact = await Contacts.getContactById(id);
      console.table(contact);
      break;
    case "add":
      const newContact = await Contacts.addContact(name, email, phone);
      console.table(newContact);
      break;
    case "remove":
      const deletedContact = await Contacts.removeContact(id);
      console.table(deletedContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
}

invokeAction(options);
