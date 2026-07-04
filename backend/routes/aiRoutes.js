import express from "express";
import { getTodayPlan } from "../controllers/aiController.js";

import { generateAISchedule } from "../services/AIPlannerService.js";

import { regeneratePlan } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/today", protect, getTodayPlan);
router.get("/regenerate", protect, regeneratePlan);


export default router;