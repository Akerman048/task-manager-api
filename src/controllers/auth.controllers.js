import {
  registerUserService,
  loginUserService,
  getUserByIdService,
} from "../services/auth.service.js";

/* REGISTER USER */
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

/* LOGIN USER */
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

/* GET USER BY ID */
export const getMe = async (req, res, next) => {
  try {
    const id  = req.user.id;

    const user = await getUserByIdService(id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
