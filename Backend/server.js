import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobApplication from "./routes/jobApplicationRoutes.js";
import verificationRoutes from "./routes/verificationRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", jobApplication);
app.use("/api/verification", verificationRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("       ✅ MongoDB Connected!"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`       🚀 Server running on port ${PORT}`));
