import { StatusCodes } from "http-status-codes";

import Job from "../models/job.model.js";

export const getAllJobs = async (req, res, next) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ message: "Jobs fetched", jobs });
};

export const getJob = async (req, res, next) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);
  if (!job) {
    const err = new Error(`No job with this ${jobId}.`);
    err.statusCode = StatusCodes.NOT_FOUND;
    throw err;
  }
  res.status(StatusCodes.OK).json({ message: "Fetched Signle Job", job });
};

export const createJob = async (req, res, next) => {
  const { company, position } = req.body;
  if (!company || !position) {
    const err = new Error("Please provide campany and position");
    err.statusCode = StatusCodes.BAD_REQUEST;
    throw err;
  }

  const job = new Job({ company, position });

  await job.save();

  res.status(StatusCodes.CREATED).json({ message: "Job Added", newJob: job });
};

export const updateJob = async (req, res, next) => {
  const { jobId } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
    new: true,
  });

  if (!updatedJob) {
    const err = new Error(`No job with this ${jobId}.`);
    err.statusCode = StatusCodes.NOT_FOUND;
    throw err;
  }

  res.status(StatusCodes.OK).json({ message: "Job update", job: updatedJob });
};

export const deleteJob = async (req, res, next) => {
  const { jobId } = req.params;
  const deletedJob = await Job.findByIdAndDelete(jobId);

  if (!deletedJob) {
    const err = new Error(`No job with this ${jobId}.`);
    err.statusCode = StatusCodes.NOT_FOUND;
    throw err;
  }

  res.status(StatusCodes.OK).json({ message: "Job Deleted", deletedJob });
};
