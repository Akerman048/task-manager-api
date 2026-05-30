import { findProjectByIdRepository } from "../repositories/projects.repository.js";

import {
  createTaskRepository,
  findTaskRepository,
  findTasksRepository,
  countTasksRepository,
  updateTaskRepository,
  deleteTaskRepository,
} from "../repositories/tasks.repository.js";
import { findUserById } from "../repositories/users.repository.js";

import { createTaskSchema, updateTaskSchema } from "../schemas/tasks.schema.js";
import { tasksQuerySchema } from "../schemas/tasksQuery.schema.js";

import { AppError } from "../utils/AppError.js";

/* GET TASKS */
export const getTasksService = async (userId, projectId, query) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const validation = tasksQuerySchema.safeParse(query);

  if (!validation.success) {
    throw new AppError(
      "Invalid query parameters",
      400,
      validation.error.flatten(),
    );
  }

  const filters = validation.data;

  const page = filters.page || 1;
  const limit = Math.min(Math.max(filters.limit || 10, 1), 100);
  const offset = (page - 1) * limit;

  const projectTasks = await findTasksRepository({
    userId,
    projectId,
    ...filters,
    limit,
    offset,
  });

  const total = await countTasksRepository({
    userId,
    projectId,
    status: filters.status,
    search: filters.search,
  });

  return {
    data: projectTasks,
    pagination: {
      page,
      limit,
      offset,
      total,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  };
};

/* CREATE TASK */
export const createTaskService = async (userId, projectId, data) => {
  const validation = createTaskSchema.safeParse(data);

  if (!validation.success) {
    throw new AppError("Validation error", 400, validation.error.flatten());
  }

  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const task = await createTaskRepository({ projectId, ...validation.data });

  return task;
};

/* GET TASK */
export const getTaskService = async (userId, projectId, taskId) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const task = await findTaskRepository({ projectId, taskId });

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return task;
};

/* UPDATE TASK */
export const updateTaskService = async (userId, projectId, taskId, data) => {
  const validation = updateTaskSchema.safeParse(data);

  if (!validation.success) {
    throw new AppError("Validation error", 400, validation.error.flatten());
  }

  if (Object.keys(validation.data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const updatedTask = await updateTaskRepository({
    projectId,
    taskId,
    data: validation.data,
  });

  if (!updatedTask) {
    throw new AppError("Task not found", 404);
  }

  return updatedTask;
};

/* DELETE TASK */
export const deleteTaskService = async (userId, projectId, taskId) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const deletedTask = await deleteTaskRepository({ projectId, taskId });

  if (!deletedTask) {
    throw new AppError("Task not found", 404);
  }

  return deletedTask;
};
