import repositoryContacts from "../repository/contactsRepository.js";
import { httpCode } from "../lib/constants.js";

const listContacts = async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts(req.query);
  res
    .status(httpCode.OK)
    .json({ status: "success", code: httpCode.OK, data: { ...contacts } });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await repositoryContacts.getContactById(contactId);

  if (!contact) {
    return res.status(httpCode.NOT_FOUND).json({
      status: "error",
      code: httpCode.NOT_FOUND,
      data: { contact },
      message: `Not found contact with id '${contactId}'`,
    });
  }

  res
    .status(httpCode.OK)
    .json({ status: "success", code: httpCode.OK, data: { contact } });
};

const addContact = async (req, res, next) => {
  const newContact = await repositoryContacts.addContact(req.body);
  res.status(httpCode.CREATED).json({
    status: "success",
    code: httpCode.CREATED,
    data: { contact: newContact },
  });
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await repositoryContacts.removeContact(contactId);

  if (!deletedContact) {
    res.status(httpCode.NOT_FOUND).json({
      status: "error",
      code: httpCode.NOT_FOUND,
      message: `Not found contact with id '${contactId}'`,
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
  const { contactId } = req.params;
  const contact = await repositoryContacts.updateContact(contactId, req.body);

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
      message: `Not found contact with id '${contactId}'`,
    });
  }
};

export { listContacts, getById, removeContact, addContact, updateContact };
