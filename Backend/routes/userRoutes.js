const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleware = require("../middleware/AuthMiddleware");

// User Registration (Actor or Production)
router.post("/register", UserController.registerUser);

// User Login
router.post("/login", UserController.loginUser);

// Get Logged-in User Profile (Requires Authentication)
router.get("/profile", authMiddleware, UserController.getProfile);

module.exports = router;
