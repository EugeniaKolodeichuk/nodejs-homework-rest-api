const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const router = express.Router();

const {
  addContactValidation,
  putContactValidation,
  validateUpdateFavorite,
} = require("../../middlewares/validationMiddleware");

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

router.get("/", listContacts);
router.get("/:contactId", getById);
router.post("/", addContactValidation, addContact);
router.delete("/:contactId", removeContact);
router.put("/:contactId", putContactValidation, updateContact);
router.patch(
  "/:contactId/favorite",
  validateUpdateFavorite,
  updateStatusContact
);

module.exports = router;
