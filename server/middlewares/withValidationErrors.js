import { validationResult } from "express-validator";

import { BadRequestError } from "../errors/customErrors.js";

export default (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((e) => e.msg);
        throw new BadRequestError(errorMessages);
      }

      next();
    },
  ];
};
