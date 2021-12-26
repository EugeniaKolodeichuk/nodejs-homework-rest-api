const express = require("express");
const router = express.Router();

const {
  addContactValidation,
  putContactValidation,
  validateUpdateFavorite,
  validateId,
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
router.get("/:contactId", validateId, getById);
router.post("/", addContactValidation, addContact);
router.delete("/:contactId", validateId, removeContact);
router.put("/:contactId", validateId, putContactValidation, updateContact);
router.patch(
  "/:contactId/favorite",
  validateId,
  validateUpdateFavorite,
  updateStatusContact
);

module.exports = router;
