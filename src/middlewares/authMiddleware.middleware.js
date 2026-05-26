import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.startsWith("Bearer ")) {
    const error = new Error("No token provided");
    error.statusCode = 400;
    throw error;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoder = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = {
      id: decoder.user,
    };
  } catch (error) {
    next(error);
  }
};
