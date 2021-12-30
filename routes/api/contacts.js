import { Router } from "express";
const router = new Router();

import {
  validateCreate,
  validateUpdate,
  validateId,
  validateUpdateFavorite,
  validateQuery,
} from "../../middlewares/validationMiddleware.js";

import {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} from "../../controllers/contactsController.js";

import guard from "../../middlewares/guard.js";

router.get("/", [guard, validateQuery], listContacts);

router.get("/:contactId", [guard, validateId], getById);

router.post("/", [guard, validateCreate], addContact);

router.delete("/:contactId", [guard, validateId], removeContact);

router.put("/:contactId", [guard, validateId, validateUpdate], updateContact);

router.patch(
  "/:contactId/favorite",
  [guard, validateId, validateUpdateFavorite],
  updateContact
);

export default router;
