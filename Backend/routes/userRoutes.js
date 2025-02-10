import { Router } from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/UserController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = Router();

// User Registration (Actor or Production)
router.post("/register", registerUser);

// User Login
router.post("/login", loginUser);

// Get Logged-in User Profile (Requires Authentication)
router.get("/profile", authMiddleware, getProfile);

export default router;
