import { UnAuthenticatedError } from "../errors/customErrors.js";
import User from "../models/user.model.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export default async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnAuthenticatedError("Authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    const user = await User.findById(userId);
    const isTestUser = user.email === "test@test.test";
    req.user = { userId, role, isTestUser };
    next();
  } catch (err) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};
