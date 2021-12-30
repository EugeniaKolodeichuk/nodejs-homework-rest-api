import { Router } from "express";
const router = new Router();
import {
  registration,
  login,
  logout,
} from "../../controllers/authController.js";

import guard from "../../middlewares/guard.js";

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", guard, logout);

export default router;
