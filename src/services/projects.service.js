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

/* GET PROJECTS */
export const getProjectsService = async (userId) => {
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const projects = await findProjectsRepository(userId);

  return projects;
};

/* CREATE PROJECT */
export const createProjectService = async (userId, data) => {
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const validation = createProjectSchema.safeParse(data);

  if (!validation.success) {
    const error = new Error("Validation error");
    error.statusCode = 400;
    throw error;
  }

  const { title, description } = validation.data;

  const project = await createProjectRepository({ userId, title, description });

  return project;
};

/* GET PROJECT BY ID */
export const getProjectByIdService = async (userId, projectId) => {
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

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

/* UPDATE PROJECT */
export const updateProjectService = async (userId, projectId, data) => {
  const validation = updateProjectSchema.safeParse(data);

  if (!validation.success) {
    const error = new Error("Validation error");
    error.statusCode = 400;
    throw error;
  }

  const project = await findProjectByIdRepository({ userId, projectId });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
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
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  if (!projectId || Number.isNaN(Number(projectId))) {
    const error = new Error("Invalid project id");
    error.statusCode = 400;
    throw error;
  }

  const deletedProject = await deleteProjectRepository({ userId, projectId });

  if (!deletedProject) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return deletedProject;
};
