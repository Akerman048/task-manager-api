import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controllers.js";

const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:taskId", getTask);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
