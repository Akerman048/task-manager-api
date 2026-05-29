import {
  createTaskService,
  deleteTaskService,
  getTaskService,
  getTasksService,
  updateTaskService,
} from "../services/tasks.service.js";
import { AppError } from "../utils/AppError.js";

/* GET TASKS */
export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      throw new AppError("Invalid project id", 400);
    }

    const result = await getTasksService(userId, projectId, req.query);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

/* CREATE TASK */
export const createTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      throw new AppError("Invalid project id", 400);
    }

    const task = await createTaskService(userId, projectId, req.body);

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/* GET TASK */
export const getTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      throw new AppError("Invalid project id", 400);
    }

    if (!taskId || Number.isNaN(Number(taskId))) {
      throw new AppError("Invalid task id", 400);
    }

    const task = await getTaskService(userId, projectId, taskId);

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

/* UPDATE TASK */
export const updateTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      throw new AppError("Invalid project id", 400);
    }

    if (!taskId || Number.isNaN(Number(taskId))) {
      throw new AppError("Invalid task id", 400);
    }

    const updatedTask = await updateTaskService(
      userId,
      projectId,
      taskId,
      req.body,
    );

    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    next(error);
  }
};

/* DELETE TASK */
export const deleteTask = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;

    if (!userId) {
      throw new AppError("Unauthorized", 401);
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      throw new AppError("Invalid project id", 400);
    }

    if (!taskId || Number.isNaN(Number(taskId))) {
      throw new AppError("Invalid task id", 400);
    }

    const deletedTask = await deleteTaskService(userId, projectId, taskId);

    res.status(200).json({ success: true, data: deletedTask });
  } catch (error) {
    next(error);
  }
};
