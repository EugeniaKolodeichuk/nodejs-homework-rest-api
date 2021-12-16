const crypto = require("crypto");
const fs = require("fs/promises");
const path = require("path");

let readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf8"
  );
  const result = JSON.parse(content);
  return result;
};

const listContacts = async (req, res, next) => {
  const contacts = await readContent();
  res.status(200).json({ contacts, status: "success" });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contacts = await readContent();
  const contact = contacts.find((item) => item.id === contactId);

  if (!contact) {
    return res
      .status(404)
      .json({ message: `Not found contact with id '${contactId}'` });
  }

  res.status(200).json({ contact, status: "success" });
};

const addContact = async (req, res, next) => {
  const contacts = await readContent();
  const { name, email, phone } = req.body;

  const newContact = { id: crypto.randomUUID(), name, email, phone };

  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );

  res.status(201).json({ newContact, status: "success" });
};

const removeContact = async (req, res, next) => {
  const contacts = await readContent();
  const deletedContact = contacts.find(
    (contact) => contact.id === req.params.contactId
  );

  if (!deletedContact) {
    res
      .status(404)
      .json({ message: `Not found contact with id '${req.params.contactId}'` });
    return;
  }

  const finalList = contacts.filter(
    (contact) => contact.id !== req.params.contactId
  );

  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(finalList, null, 2)
  );

  res.status(200).json({ deletedContact, message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const contacts = await readContent();
  const newContact = contacts.find(
    (contact) => contact.id === req.params.contactId
  );
  newContact = { ...newContact, name, email, phone };
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );

  if (newContact) {
    res.status(200).json({ newContact, status: "Contact changed" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
