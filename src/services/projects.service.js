import {
  findProjectsRepository,
  createProjectRepository,
} from "../repositories/projects.repository.js";
import {
  findUserByEmail,
  findUserById,
} from "../repositories/users.repository.js";
import { createProjectSchema } from "../schemas/projects.schema.js";

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
