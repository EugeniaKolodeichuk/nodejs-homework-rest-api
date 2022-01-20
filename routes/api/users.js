import { Router } from "express";
import guard from "../../middlewares/guard.js";
import { upload } from "../../middlewares/upload.js";
import {
  aggregation,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} from "../../controllers/userController.js";

const router = new Router();

router.get("/stats/:id", guard, aggregation);
router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);
router.get("/verify/:token", verifyUser);
router.post("/verify", repeatEmailForVerifyUser);

export default router;
