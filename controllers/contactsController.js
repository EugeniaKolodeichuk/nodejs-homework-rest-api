const { Contact } = require("../db/contactsModel");

const listContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.status(200).json({ contacts, status: "success" });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId);

  if (!contact) {
    return res
      .status(404)
      .json({ message: `Not found contact with id '${contactId}'` });
  }

  res.status(200).json({ contact, status: "success" });
};

const addContact = async (req, res, next) => {
  const { name, email, phone, favorite = false } = req.body;
  const contacts = new Contact({ name, email, phone, favorite });

  await contacts.save();

  const newContact = { name, email, phone, favorite };
  res.status(201).json({ newContact, status: "success" });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);

  if (!deletedContact) {
    res
      .status(404)
      .json({ message: `Not found contact with id '${contactId}'` });
    return;
  }
  res.status(200).json({ deletedContact, message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body;
  const { contactId } = req.params;

  const newContact = await Contact.findByIdAndUpdate(contactId, {
    $set: { name, email, phone, favorite },
  });

  if (newContact) {
    res.status(200).json({ newContact, status: "Contact changed" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const updateStatusContact = async (req, res, next) => {
  const { favorite } = req.body;
  const { contactId } = req.params;

  const changedContact = await Contact.findByIdAndUpdate(contactId, {
    $set: { favorite },
  });

  if (changedContact) {
    res.status(200).json({ changedContact, status: "Contact changed" });
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
  updateStatusContact,
};
