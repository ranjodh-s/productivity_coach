import {
  getAllTasksDB,
  getTaskByIdDB,
  createTaskDB,
  updateTaskDB,
  updateTaskStatusDB,
  deleteTaskDB,
} from "../models/taskModel.js";

import { generateAISchedule } from "../services/AIPlannerService.js";


// ==============================
// GET /api/tasks
// ==============================

export const getAllTasks = async (req, res) => {
  try {

    const userId = req.user.id;

    const tasks = await getAllTasksDB(userId);

    res.status(200).json(tasks);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });

  }
};


// ==============================
// GET /api/tasks/:id
// ==============================

export const getTaskById = async (req, res) => {

  try {

    const { id } = req.params;

    const userId = req.user.id;

    const task = await getTaskByIdDB(id, userId);

    if (!task) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    res.status(200).json(task);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to fetch task",
    });

  }

};


// ==============================
// POST /api/tasks
// ==============================

export const createTask = async (req, res) => {

  try {

    const userId = req.user.id;

    const {
      title,
      description,
      priority,
      deadline,
      estimated_hours,
    } = req.body;

    if (!title) {

      return res.status(400).json({
        message: "Title is required",
      });

    }

    const newTask = await createTaskDB(

      userId,
      title,
      description,
      priority,
      deadline,
      estimated_hours

    );

    // Generate AI Schedule
    await generateAISchedule(userId);

    res.status(201).json({

      message: "Task created successfully",

      task: newTask,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create task",
    });

  }

};


// ==============================
// PUT /api/tasks/:id
// ==============================

export const updateTask = async (req, res) => {

  try {

    const { id } = req.params;

    const userId = req.user.id;

    const {

      title,
      description,
      priority,
      status,
      deadline,
      estimated_hours,

    } = req.body;

    const updatedTask = await updateTaskDB(

      id,
      userId,
      title,
      description,
      priority,
      status,
      deadline,
      estimated_hours

    );

    if (!updatedTask) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    await generateAISchedule(userId);

    res.status(200).json({

      message: "Task updated successfully",

      task: updatedTask,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update task",
    });

  }

};


// ==============================
// PATCH /api/tasks/:id/status
// ==============================

export const updateTaskStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const userId = req.user.id;

    const { status } = req.body;
    console.log("Received status update request:", { id, userId, status });

    const updatedTask = await updateTaskStatusDB(

      id,
      userId,
      status

    );

    if (!updatedTask) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    await generateAISchedule(userId);

    res.status(200).json({

      message: "Task status updated",

      task: updatedTask,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to update task status",
    });

  }

};


// ==============================
// DELETE /api/tasks/:id
// ==============================

export const deleteTask = async (req, res) => {

  try {

    const { id } = req.params;

    const userId = req.user.id;

    const deletedTask = await deleteTaskDB(

      id,
      userId

    );

    if (!deletedTask) {

      return res.status(404).json({
        message: "Task not found",
      });

    }

    await generateAISchedule(userId);

    res.status(200).json({

      message: "Task deleted successfully",

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to delete task",
    });

  }

};