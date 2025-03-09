import { Router } from "express";

import { jobInputValidator } from "../validators/job.validators.js";

const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobs.controller.js";

// router.get("/", getAllJobs);

// router.get("/:jobId/", getJob);

// router.post("/", createJob);

// router.patch("/:jobId/", updateJob);

// router.delete("/:jobId/", deleteJob);

router.route("/").get(getAllJobs).post(jobInputValidator, createJob);
router
  .route("/:jobId/")
  .get(getJob)
  .patch(jobInputValidator, updateJob)
  .delete(deleteJob);

export default router;
