import "express-async-errors";

import * as dotevn from "dotenv";
dotevn.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

// routers
import jobsRoutes from "./routes/job.routes.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.use("/api/v1/jobs/", jobsRoutes);

app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error("Err❌ : " + err.message);
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong";
  res.status(statusCode).json({ message: errorMessage });
});

const PORT = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`App running or port ${PORT} 🚀.....`);
  });
} catch (err) {
  console.log(err);
  process.exit(-1);
}
