import { Router } from "express";
import {
  createJob,
  getAllJobs,
  getDirectorJobs,
} from "../controllers/JobController.js";
import authenticateUser from "../middleware/AuthMiddleware.js";
import roleMiddleware from "../middleware/RoleMiddleware.js";

const router = Router();

router.post(
  "/create",
  authenticateUser,
  roleMiddleware(["director"]),
  createJob
);

router.get("/all", getAllJobs);

router.get(
  "/my-jobs",
  authenticateUser,
  roleMiddleware(["director"]),
  getDirectorJobs
);

export default router;
