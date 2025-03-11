import "express-async-errors";

import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// routers
import jobsRoutes from "./routes/job.routes.js";
import authRoutes from "./routes/auth.routes.js";

// middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import isAuth from "./middlewares/isAuth.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.use("/api/v1/jobs/", isAuth, jobsRoutes);
app.use("/api/v1/auth/", authRoutes);

app.use("*", (req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandlerMiddleware);

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
