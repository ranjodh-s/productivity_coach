import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import { GoogleGenAI } from "@google/genai";
import taskRoutes from "./routes/taskRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import scheduleRoutes from "./routes/scheduleRoutes.js";
import { startMorningPlanner } from "./jobs/morningPlanner.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://productivity-coach-taupe.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);

    startMorningPlanner();
});

