import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRegisterSchema, userLoginSchema } from "../schemas/auth.schema.js";

import {
  registerUserRepository,
  findUserByEmail,
} from "../repositories/users.repository.js";

/* REGISTER USER */
export const registerUserService = async (data) => {
  const validation = userRegisterSchema.safeParse(data);

  if (!validation.success) {
    const error = new Error("Validation error");
    error.statusCode = 400;
    error.errors = validation.error.flatten();
    throw error;
  }

  const { name, email, password } = validation.data;

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await registerUserRepository({ name, email, passwordHash });

  return user;
};

/* LOGIN USER */
export const loginUserService = async (data) => {
  const validation = userLoginSchema.safeParse(data);

  if (!validation.success) {
    const error = new Error("Validation error");
    error.statusCode = 400;
    error.errors = validation.error.flatten();
    throw error;
  }

  const { email, password } = validation.data;

  const user = await findUserByEmail(email);

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
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
