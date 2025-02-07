const express = require("express");
const router = express.Router();
const verificationController = require("../controllers/VerificationController");
const authMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/RoleMiddleware");

router.post("/request",authMiddleware,roleMiddleware("director"),verificationController.verifyDirector)