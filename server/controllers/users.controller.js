import { promises as fs } from "fs";

import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";

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
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const oldUser = await User.findOneAndUpdate(
    { _id: req.user.userId },
    newUser
  );

  if (req.file && oldUser.avatarPublicId) {
    await cloudinary.uploader.destroy(oldUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ message: "User updated!" });
};
