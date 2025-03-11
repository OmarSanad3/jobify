import { UnAuthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export default async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnAuthenticatedError("Authentication invalid");

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };
    next();
  } catch (err) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
};
