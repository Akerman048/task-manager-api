import { findProjectByIdRepository } from "../repositories/projects.repository.js";

import {
  createTaskRepository,
  findTaskRepository,
  findTasksRepository,
  updateTaskRepository,
  deleteTaskRepository,
} from "../repositories/tasks.repository.js";
import { findUserById } from "../repositories/users.repository.js";

import { createTaskSchema, updateTaskSchema } from "../schemas/tasks.schema.js";

/* GET TASKS */
export const getTasksService = async (userId, projectId) => {
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const projectTasks = await findTasksRepository({ userId, projectId });

  return projectTasks;
};

/* CREATE TASK */
export const createTaskService = async (userId, projectId, data) => {
  const validation = createTaskSchema.safeParse(data);

  if (!validation.success) {
    const error = new Error("Validation error");
    error.statusCode = 400;
    error.errors = validation.error.flatten();
    throw error;
  }

  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const task = await createTaskRepository({ projectId, ...validation.data });

  return task;
};

/* GET TASK */
export const getTaskService = async (userId, projectId, taskId) => {
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const task = await findTaskRepository({ projectId, taskId });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

/* UPDATE TASK */
export const updateTaskService = async (userId, projectId, taskId, data) => {
  const validation = updateTaskSchema.safeParse(data);

  if (!validation.success) {
    const error = new Error("Validation error");
    error.statusCode = 400;
    error.errors = validation.error.flatten();
    throw error;
  }

  if (Object.keys(validation.data).length === 0) {
  const error = new Error("No fields to update");
  error.statusCode = 400;
  throw error;
}

  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const updatedTask = await updateTaskRepository({
    projectId,
    taskId,
    data: validation.data,
  });

  if (!updatedTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return updatedTask;
};

/* DELETE TASK */
export const deleteTaskService = async (userId, projectId, taskId) => {
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const deletedTask = await deleteTaskRepository({ projectId, taskId });

  if (!deletedTask) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return deletedTask;
};
