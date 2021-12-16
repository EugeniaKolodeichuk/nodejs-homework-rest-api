const express = require("express");

const router = express.Router();

const {
  addContactValidation,
  putContactValidation,
  patchContactValidation,
} = require("../../middlewares/validationMiddleware");

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  changeContact,
  updateContact,
} = require("../../controllers/contactsController");

router.get("/", listContacts);
router.get("/:contactId", getById);
router.post("/", addContactValidation, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", putContactValidation, changeContact);
router.patch("/:contactId", patchContactValidation, updateContact);

module.exports = router;
