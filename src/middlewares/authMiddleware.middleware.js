import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("No token provided");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const decoder = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = {
      id: decoder.userId,
    };

    next();
  } catch (error) {
    next(error);
  }
};
