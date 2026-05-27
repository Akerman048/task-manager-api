import { getTasksService } from "../services/tasks.service.js";

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

export const createTask = async (req, res, next) => {};

export const getTask = async (req, res, next) => {};

export const updateTask = async (req, res, next) => {};

export const deleteTask = async (req, res, next) => {};
