import { StatusCodes } from "http-status-codes";

import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnAuthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res, next) => {
  const { email, name, password, lastName, location } = req.body;

  const isFirst = (await User.countDocuments()) === 0;

  const hashedPassword = await hashPassword(password);

  await User.create({
    name,
    email,
    password: hashedPassword,
    lastName,
    location,
    role: isFirst ? "admin" : "user",
  });

  res.status(StatusCodes.CREATED).json({ message: "user created" });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new UnAuthenticatedError("Invalid credentials");

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) throw new UnAuthenticatedError("Invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1d
    secure: process.env.NODE_ENV === "production", // * if production, set it to https
  });

  res.status(StatusCodes.OK).json({ message: "Login user" });
};

export const logout = (req, res, next) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production", // * if production, set it to https
  });

  res.status(StatusCodes.OK).send({ message: "User logged out" });
};
