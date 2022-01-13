import { Router } from "express";
import { upload } from "../../middlewares/upload.js";
import { uploadAvatar } from "../../controllers/userController.js";

const router = new Router();
import {
  registration,
  login,
  logout,
  current,
} from "../../controllers/authController.js";

import {
  validateLogin,
  validateRegistration,
} from "../../middlewares/validationMiddleware.js";

import guard from "../../middlewares/guard.js";

router.post("/registration", validateRegistration, registration);
router.post("/login", validateLogin, login);
router.post("/logout", guard, logout);
router.get("/current", guard, current);
/* router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar); */

export default router;
