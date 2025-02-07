const express = require("express");
const router = express.Router();
const JobApplicationController = require("../controllers/JobApplicationController");
const authMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/RoleMiddleware");

// Apply for a Job (Only Actor)
router.post(
  "/apply",
  authMiddleware,
  roleMiddleware("actor"),
  JobApplicationController.applyForJob
);

// Withdraw Job Application (Only Actor)
router.delete(
  "/withdraw/:applicationId",
  authMiddleware,
  roleMiddleware("actor"),
  JobApplicationController.withdrawApplication
);

// Get Applications for a Job (Only for Director)
router.get(
  "/job/:jobId",
  authMiddleware,
  roleMiddleware("director"),
  JobApplicationController.getApplicationsForJob
);

module.exports = router;
