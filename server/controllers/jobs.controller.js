import { StatusCodes } from "http-status-codes";

import Job from "../models/job.model.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors/customErrors.js";

export const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ message: "Jobs fetched", jobs });
};

export const getJob = async (req, res, next) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) throw new NotFoundError(`No job with this ${id}.`);

  if (job.createdBy.toString() !== req.user.userId.toString())
    throw new UnAuthorizedError("You are UnAuthorized");

  res.status(StatusCodes.OK).json({ message: "Fetched Job", job });
};

export const createJob = async (req, res, next) => {
  const { company, position } = req.body;

  if (!company || !position)
    throw new BadRequestError("Please provide company and position");

  const job = new Job({ company, position, createdBy: req.user.userId });
  await job.save();

  res.status(StatusCodes.CREATED).json({ message: "Job Added", newJob: job });
};

export const updateJob = async (req, res, next) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) throw new NotFoundError(`No job with this ${id}.`);

  if (updatedJob.createdBy.toString() !== req.user.userId.toString())
    throw new UnAuthorizedError("You are UnAuthorized");

  res.status(StatusCodes.OK).json({ message: "Job update", job: updatedJob });
};

export const deleteJob = async (req, res, next) => {
  const { id } = req.params;

  const deletedJob = await Job.findByIdAndDelete(id);

  if (!deletedJob) throw new NotFoundError(`No job with this ${id}.`);

  if (deletedJob.createdBy.toString() !== req.user.userId.toString())
    throw new UnAuthorizedError("You are UnAuthorized");

  res.status(StatusCodes.OK).json({ message: "Job Deleted", deletedJob });
};
