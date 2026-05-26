import express from "express";

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);

export default router;
