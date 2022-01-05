import repositoryContacts from "../repository/contactsRepository.js";
import { httpCode } from "../lib/constants.js";

const listContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const contacts = await repositoryContacts.listContacts(userId, req.query);
  res
    .status(httpCode.OK)
    .json({ status: "success", code: httpCode.OK, data: { ...contacts } });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await repositoryContacts.getContactById(userId, id);

  if (!contact) {
    return res.status(httpCode.NOT_FOUND).json({
      status: "error",
      code: httpCode.NOT_FOUND,
      data: { contact },
      message: `Not found contact with id '${id}'`,
    });
  }

  res
    .status(httpCode.OK)
    .json({ status: "success", code: httpCode.OK, data: { contact } });
};

const addContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const newContact = await repositoryContacts.addContact(userId, req.body);
  res.status(httpCode.CREATED).json({
    status: "success",
    code: httpCode.CREATED,
    data: { contact: newContact },
  });
};

const removeContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const deletedContact = await repositoryContacts.removeContact(userId, id);

  if (!deletedContact) {
    res.status(httpCode.NOT_FOUND).json({
      status: "error",
      code: httpCode.NOT_FOUND,
      message: `Not found contact with id '${id}'`,
    });
    return;
  }
  res.status(httpCode.OK).json({
    status: "success",
    code: httpCode.OK,
    data: { contact: deletedContact },
    message: "Contact deleted",
  });
};

const updateContact = async (req, res, next) => {
  const { id: userId } = req.user;
  const { id } = req.params;
  const contact = await repositoryContacts.updateContact(userId, id, req.body);

  if (contact) {
    res.status(httpCode.OK).json({
      status: "success",
      code: httpCode.OK,
      data: { contact },
      message: "Contact changed",
    });
  } else {
    res.status(httpCode.NOT_FOUND).json({
      status: "error",
      code: httpCode.NOT_FOUND,
      data: { contact },
      message: `Not found contact with id '${id}'`,
    });
  }
};

export { listContacts, getById, removeContact, addContact, updateContact };

