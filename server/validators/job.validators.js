import mongoose from "mongoose";
import { body, param } from "express-validator";

import withValidationErrors from "../middlewares/withValidationErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("jobLocation is required"),
  body("jobStatus")
    .notEmpty()
    .withMessage("jobStatus is required")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid jobStatus value"),
  body("jobType")
    .notEmpty()
    .withMessage("jobType is required")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Invalid jobType value"),
]);

export const validateIdParam = withValidationErrors([
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid MongoDb id"),
]);
