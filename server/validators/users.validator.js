import { body } from "express-validator";

import withValidationErrors from "../middlewares/withValidationErrors.js";
import User from "../models/user.model.js";
import { BadRequestError } from "../errors/customErrors.js";

export const validateUpdateUser = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: value });
      if (user && user._id.toString() !== req.user.userId.toString())
        throw new BadRequestError("User with this email already exists");
    }),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
]);
