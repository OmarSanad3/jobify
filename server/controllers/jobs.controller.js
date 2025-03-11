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

  const job = await validateJobId(id, req);

  res.status(StatusCodes.OK).json({ message: "Fetched Job...", job });
};

export const createJob = async (req, res, next) => {
  const { company, position, jobLocation, jobStatus, jobType } = req.body;

  const job = new Job({
    company,
    position,
    jobLocation,
    jobStatus,
    jobType,
    createdBy: req.user.userId,
  });
  await job.save();

  res.status(StatusCodes.CREATED).json({ message: "Job Added", newJob: job });
};

export const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { company, position, jobLocation, jobStatus, jobType } = req.body;

  let job = await validateJobId(id, req);

  job.company = company;
  job.position = position;
  job.jobLocation = jobLocation;
  job.jobStatus = jobStatus;
  job.jobType = jobType;

  await job.save();

  res.status(StatusCodes.OK).json({ message: "Job update", job });
};

export const deleteJob = async (req, res, next) => {
  const { id } = req.params;

  const job = await validateJobId(id, req);

  await job.deleteOne();

  res.status(StatusCodes.OK).json({ message: "Job Deleted" });
};

// ======================================== Helpers ========================================

const validateJobId = async (id, req) => {
  const job = await Job.findById(id);

  if (!job) throw new NotFoundError(`No job with this ${id}.`);

  if (job.createdBy.toString() !== req.user.userId.toString())
    throw new UnAuthorizedError("You are UnAuthorized");

  return job;
};
