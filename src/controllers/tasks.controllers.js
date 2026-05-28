import {
  createTaskService,
  deleteTaskService,
  getTaskService,
  getTasksService,
  updateTaskService,
} from "../services/tasks.service.js";

/* GET TASKS */
export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;

    if (!userId) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      const error = new Error("Invalid project id");
      error.statusCode = 400;
      throw error;
    }

    const tasks = await getTasksService(userId, projectId);

    res.status(200).json({
      success: true,
      data: tasks,
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
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      const error = new Error("Invalid project id");
      error.statusCode = 400;
      throw error;
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
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      const error = new Error("Invalid project id");
      error.statusCode = 400;
      throw error;
    }

    if (!taskId || Number.isNaN(Number(taskId))) {
      const error = new Error("Invalid task id");
      error.statusCode = 400;
      throw error;
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
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      const error = new Error("Invalid project id");
      error.statusCode = 400;
      throw error;
    }

    if (!taskId || Number.isNaN(Number(taskId))) {
      const error = new Error("Invalid task id");
      error.statusCode = 400;
      throw error;
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
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    if (!projectId || Number.isNaN(Number(projectId))) {
      const error = new Error("Invalid project id");
      error.statusCode = 400;
      throw error;
    }

    if (!taskId || Number.isNaN(Number(taskId))) {
      const error = new Error("Invalid task id");
      error.statusCode = 400;
      throw error;
    }

    const deletedTask = await deleteTaskService(userId, projectId, taskId);

    res.status(200).json({ success: true, data: deletedTask });
  } catch (error) {
    next(error);
  }
};
