import {
  getProjectsService,
  createProjectService,
  getProjectByIdService,
  updateProjectService,
  deleteProjectService,
} from "../services/projects.service.js";
import { AppError } from "../utils/AppError.js";

/* GET PROJECTS */
export const getProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!userId) {
  throw new AppError("Unauthorized", 401);
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
  throw new AppError("Unauthorized", 401);
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

/* GET PROJECT BY ID */
export const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const userId = req.user.id;

    if (!userId) {
  throw new AppError("Unauthorized", 401);
    }

    const project = await getProjectByIdService(userId, projectId);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/* UPDATE PROJECT */
export const updateProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    if (!userId) {
  throw new AppError("Unauthorized", 401);
    }

    const updatedProject = await updateProjectService(
      userId,
      projectId,
      req.body,
    );

    res.status(200).json({
      success: true,
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

/* DELETE PROJECT */
export const deleteProject = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;

    const deletedProject = await deleteProjectService(userId, projectId);

    res.status(200).json({
      success: true,
      data: deletedProject,
    });
  } catch (error) {
    next(error);
  }
};
