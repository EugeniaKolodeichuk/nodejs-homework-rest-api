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

router.get("/:id", [guard, validateId], getById);

router.post("/", [guard, validateCreate], addContact);

router.delete("/:id", [guard, validateId], removeContact);

router.put("/:id", [guard, validateId, validateUpdate], updateContact);

router.patch(
  "/:id/favorite",
  [guard, validateId, validateUpdateFavorite],
  updateContact
);

export default router;
