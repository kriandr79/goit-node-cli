const fs = require("node:fs").promises;
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "/db/contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function writeContacts(contacts) {
  return await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, undefined, 2)
  );
}

async function listContacts() {
  const allcontacts = await readContacts();
  return allcontacts;
}

async function getContactById(contactId) {
  const allcontacts = await readContacts();
  return allcontacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const allcontacts = await readContacts();
  const index = allcontacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const deletedContact = allcontacts.splice(index, 1);
  await writeContacts(allcontacts);

  return deletedContact;
}

async function addContact(name, email, phone) {
  const allcontacts = await readContacts();

  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  allcontacts.push(newContact);
  await writeContacts(allcontacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
