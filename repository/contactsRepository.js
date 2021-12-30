import Contact from "../db/contactsModel.js";

const listContacts = async (filter, limit = 20, skip = 0) => {
  const total = await Contact.find().countDocuments();
  let result = await Contact.find();
  /*  if (filter) {
    result = result.select(filter.split("|").join(" "));
  }
  result = await result.skip(Number(skip)).limit(Number(limit)); */
  return { total, contacts: result };
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { ...body },
    { new: true }
  );
  return result;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
