import { Router } from "express";

import { validateJobInput } from "../validators/job.validators.js";

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

router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
  .route("/:id/")
  .get(getJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
