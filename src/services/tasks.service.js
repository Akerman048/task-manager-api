import { findProjectByIdRepository } from "../repositories/projects.repository.js";

import { findTasks } from "../repositories/tasks.repository.js";

/* GET TASKS */
export const getTasksService = async (userId, projectId) => {
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const project = await findProjectByIdRepository({userId, projectId});

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  const projectTasks = await findTasks({ userId, projectId });

  return projectTasks;
};
