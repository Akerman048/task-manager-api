import { getProjectsService } from "../services/projects.service.js";

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

export const createProject = async (req, res, next) => {};

export const getProjectById = async (req, res, next) => {};

export const updateProject = async (req, res, next) => {};

export const deleteProject = async (req, res, next) => {};
