import { Router } from "express";
import guard from "../../middlewares/guard.js";
import { upload } from "../../middlewares/upload.js";
import { uploadAvatar } from "../../controllers/userController.js";

const router = new Router();

router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

export default router;
