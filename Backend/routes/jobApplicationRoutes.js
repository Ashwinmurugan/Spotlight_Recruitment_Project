import { Router } from "express";
import {
  applyForJob,
  withdrawApplication,
  getApplicationsForJob,
} from "../controllers/JobApplicationController.js"; 
import authenticateUser from "../middleware/AuthMiddleware.js"; 

import roleMiddleware from "../middleware/RoleMiddleware.js"; 

const router = Router();

// Apply for a Job (Only Actor)
router.post("/apply", authenticateUser, roleMiddleware("actor"), applyForJob);

// Withdraw Job Application (Only Actor)
router.delete(
  "/withdraw/:applicationId",
  authenticateUser,
  roleMiddleware(["actor"]),
  withdrawApplication
);

// Get Applications for a Job (Only for Director)
router.get(
  "/job/:jobId",
  authenticateUser,
  roleMiddleware(["director"]),
  getApplicationsForJob
);

export default router;
