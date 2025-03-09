import { Router } from "express";

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

router.route("/").get(getAllJobs).post(createJob);
router.route("/:jobId/").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
