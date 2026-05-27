import {
  getProjectsService,
  createProjectService,
} from "../services/projects.service.js";

/* GET PROJECTS */
export const getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      const error = new Error("User not found");
      error.statusCode = 401;
      throw error;
    }

    const projects = await getProjectsService(userId);

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

/* CREATE PROJECT */
export const createProject = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const project = await createProjectService(userId, req.body);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {};

export const updateProject = async (req, res, next) => {};

export const deleteProject = async (req, res, next) => {};
