import { StatusCodes } from "http-status-codes";

import User from "../models/user.model.js";
import Job from "../models/job.model.js";
import { UnAuthorizedError } from "../errors/customErrors.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  res
    .status(StatusCodes.OK)
    .json({ message: "Get user info", user: user.toJSON() });
};

export const getApplicationStats = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (user.role !== "admin")
    throw new UnAuthorizedError("User is not an admin");

  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res
    .status(StatusCodes.OK)
    .json({ message: "Get application Stats", users, jobs });
};

export const updateUser = async (req, res) => {
  // const { name, email, password, lastName, location } = req.body;
  const obj = { ...req.body };
  delete obj.password;

  const user = await User.findOneAndUpdate({ _id: req.user.userId }, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ message: "User updated!", user });
};
