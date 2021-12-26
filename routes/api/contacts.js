import { Router } from "express";
const router = new Router();

import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
} from "../../middlewares/validationMiddleware.js";

import {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} from "../../controllers/contactsController.js";

router.get("/", listContacts);

router.get("/:contactId", validateId, getById);

router.post("/", validateCreate, addContact);

router.delete("/:contactId", validateId, removeContact);

router.put("/:contactId", validateId, validateUpdate, updateContact);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateUpdateFavorite,
  updateContact
);

export default router;
