import { findProjectsRepository } from "../repositories/projects.repository.js";
import {
  findUserByEmail,
  findUserById,
} from "../repositories/users.repository.js";
import { createProjectSchema } from "../schemas/projects.schema.js";

export const getProjectsService = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const projects = await findProjectsRepository(userId);

  return projects;
};
