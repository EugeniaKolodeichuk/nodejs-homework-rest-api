const express = require("express");

const router = express.Router();

const {
  addContactValidation,
  putContactValidation,
} = require("../../middlewares/validationMiddleware");

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contactsController");

router.get("/", listContacts);
router.get("/:contactId", getById);
router.post("/", addContactValidation, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", putContactValidation, updateContact);

module.exports = router;
