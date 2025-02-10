import express from "express";
import authenticateUser from "../middleware/AuthMiddleware.js"; 
import roleMiddleware from "../middleware/RoleMiddleware.js";  
import verifyDirector from "../controllers/VerificationController.js";

const router = express.Router();

router.post(
  "/request",
  authenticateUser,   
  roleMiddleware(["director"]),
  verifyDirector
);


export default router;
