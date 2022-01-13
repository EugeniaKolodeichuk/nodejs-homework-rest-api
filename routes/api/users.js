import { Router } from "express";
import guard from "../../middlewares/guard.js";
import { upload } from "../../middlewares/upload.js";
import { aggregation, uploadAvatar } from "../../controllers/userController.js";

const router = new Router();

router.get("/stats/:id", guard, aggregation);
router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

export default router;
