import "express-async-errors";

import * as dotenv from "dotenv";
dotenv.config();

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

// routers
import jobsRoutes from "./routes/job.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";

// middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import isAuth from "./middlewares/isAuth.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public/")));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.send("Hello");
});

app.use("/api/v1/jobs/", isAuth, jobsRoutes);
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/users/", isAuth, usersRoutes);

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
