import { Router } from "express";

const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/users.controller.js";
import { validateUpdateUser } from "../validators/users.validator.js";
import upload from "../middlewares/multer.middleware.js";

router.get("/current-user", getCurrentUser);

router.get("/admin/app-stats", getApplicationStats);

router.patch(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUser,
  updateUser
);

export default router;
