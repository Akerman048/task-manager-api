import express from "express";

import authRoutes from "./routers/auth.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

app.use("/auth", authRoutes);

app.use(errorMiddleware);

export default app;
