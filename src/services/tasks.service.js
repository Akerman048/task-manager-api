import { findProjectByIdRepository } from "../repositories/projects.repository.js";

import {
  createTaskRepository,
  findTaskRepository,
  findTasksRepository,
} from "../repositories/tasks.repository.js";

import { createTaskSchema } from "../schemas/tasks.schema.js";

/* GET TASKS */
export const getTasksService = async (userId, projectId) => {
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
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
