const express = require("express");
const router = express.Router();
const JobController = require("../controllers/JobController");
const authMiddleware = require("../middleware/AuthMiddleware");
const roleMiddleware = require("../middleware/RoleMiddleware");


// Create Job (Only Production Team/Director)
router.post(
  "/create",
  authMiddleware,
  roleMiddleware("director"),
  JobController.createJob
);


// Get All Jobs (Public)
router.get("/all", JobController.getAllJobs);


// Get Jobs Posted by a Specific Director (Requires Authentication) 
router.get(
  "/my-jobs",
  authMiddleware,
  roleMiddleware,
  JobController.getDirectorJobs
);


module.exports = router;