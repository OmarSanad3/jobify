import { Router } from "express";

import { login, register, logout } from "../controllers/auth.controller.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../validators/auth.validators.js";

const router = Router();

router.post("/register", validateRegisterInput, register);

router.post("/login", validateLoginInput, login);

router.post("/logout", logout);

export default router;
