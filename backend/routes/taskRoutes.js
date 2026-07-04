import express from "express";
import {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask
} from "../controllers/taskController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET all tasks
router.get("/", protect, getAllTasks);

// GET single task
router.get("/:id", protect, getTaskById);

// CREATE task
router.post("/", protect, createTask);

// UPDATE entire task
router.put("/:id", protect, updateTask);

// UPDATE only specific fields
router.patch("/:id", protect, updateTaskStatus);

// DELETE task
router.delete("/:id", protect, deleteTask);

export default router;