import {
  findProjectsRepository,
  createProjectRepository,
  findProjectByIdRepository,
  updateProjectRepository,
  deleteProjectRepository,
} from "../repositories/projects.repository.js";

import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/projects.schema.js";

import { AppError } from "../utils/AppError.js";

/* GET PROJECTS */
export const getProjectsService = async (userId) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const projects = await findProjectsRepository(userId);

  return projects;
};

/* CREATE PROJECT */
export const createProjectService = async (userId, data) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const validation = createProjectSchema.safeParse(data);

  if (!validation.success) {
    throw new AppError("Validation error", 400, validation.error.flatten());
  }

  const { title, description } = validation.data;

  const project = await createProjectRepository({ userId, title, description });

  return project;
};

/* GET PROJECT BY ID */
export const getProjectByIdService = async (userId, projectId) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  if (!projectId || Number.isNaN(Number(projectId))) {
    throw new AppError("Invalid project id", 400);
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return project;
};

/* UPDATE PROJECT */
export const updateProjectService = async (userId, projectId, data) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  if (!projectId || Number.isNaN(Number(projectId))) {
    throw new AppError("Invalid project id", 400);
  }

  const validation = updateProjectSchema.safeParse(data);

  if (!validation.success) {
    throw new AppError("Validation error", 400, validation.error.flatten());
  }

  if (Object.keys(validation.data).length === 0) {
    throw new AppError("No fields to update", 400);
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const updatedProject = await updateProjectRepository({
    userId,
    projectId,
    ...validation.data,
  });

  return updatedProject;
};

/* DELETE PROJECT */
export const deleteProjectService = async (userId, projectId) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  if (!projectId || Number.isNaN(Number(projectId))) {
    throw new AppError("Invalid project id", 400);
  }

  const deletedProject = await deleteProjectRepository({ userId, projectId });

  if (!deletedProject) {
    throw new AppError("Project not found", 404);
  }

  return deletedProject;
};
