import { BadRequestError } from "../errors/customErrors.js";

export default async (req, res, next) => {
  if (req.user.isTestUser) throw new BadRequestError("Demo User, Read Only!");
  next();
};
