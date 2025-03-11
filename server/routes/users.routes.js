import { Router } from "express";

const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/users.controller.js";
import { validateUpdateUser } from "../validators/users.validator.js";

router.get("/current-user", getCurrentUser);

router.get("/admin/app-stats", getApplicationStats);

router.patch("/update-user", validateUpdateUser, updateUser);

export default router;
