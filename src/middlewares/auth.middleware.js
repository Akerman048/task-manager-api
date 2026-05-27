import jwt from "jsonwebtoken";
import { findUserById } from "../repositories/users.repository.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("No token provided");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await findUserById(decoded.userId);

    if (!user) {
      const error = new Error("User no longer exists");
      error.statusCode = 401;
      throw error;
    }

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    next(error);
  }
};
