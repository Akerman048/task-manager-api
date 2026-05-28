import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRegisterSchema, userLoginSchema } from "../schemas/auth.schema.js";

import {
  registerUserRepository,
  findUserByEmail,
  findUserById,
} from "../repositories/users.repository.js";

import { AppError } from "../utils/AppError.js";

/* REGISTER USER */
export const registerUserService = async (data) => {
  const validation = userRegisterSchema.safeParse(data);

  if (!validation.success) {
    throw new AppError("Validation error", 400, validation.error.flatten());
  }

  const { name, email, password } = validation.data;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await registerUserRepository({ name, email, passwordHash });

  return user;
};

/* LOGIN USER */
export const loginUserService = async (data) => {
  const validation = userLoginSchema.safeParse(data);

  if (!validation.success) {
    throw new AppError("Validation error", 400, validation.error.flatten());
  }

  const { email, password } = validation.data;

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 401);
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" },
  );

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
    },
    accessToken,
  };
};

/* GET USER BY ID */
export const getUserByIdService = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
