import express from "express";

import {
  saveSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} from "../controllers/scheduleController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Save complete daily schedule
router.post("/", protect, saveSchedule);

// Get today's schedule
router.get("/", protect, getSchedule);

// Update a schedule activity
router.put("/:id", protect, updateSchedule);

// Delete a schedule activity
router.delete("/:id", protect, deleteSchedule);

export default router;