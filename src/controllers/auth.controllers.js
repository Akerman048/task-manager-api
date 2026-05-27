import {
  registerUserService,
  loginUserService,
} from "../services/auth.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await loginUserService(req.body);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {};
