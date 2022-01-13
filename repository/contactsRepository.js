import Contact from "../db/contactsModel.js";

const listContacts = async (userId) => {
  const total = await Contact.countDocuments({ owner: userId });
  let result = await Contact.find({ owner: userId });
  return { total, contacts: result };
};

const getContactById = async (userId, id) => {
  const result = await Contact.findOne({ _id: id, owner: userId });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await Contact.findOneAndRemove({ _id: id, owner: userId });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

const getStatisticsContacts = async (id) => {
  const data = await Contact.aggregate([]);
  return data;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  getStatisticsContacts,
};
