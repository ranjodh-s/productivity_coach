import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import {
  getTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
} from "../services/taskApi";

import { regeneratePlan } from "../services/aiApi";

export default function AddTask() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddTask(task) {
    try {
     
      await createTask(task);
      
      fetchTasks();
      await setTimeout(2000);     
      await regeneratePlan();
      

    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      fetchTasks();

      await regeneratePlan();
      
    } catch (err) {
      console.log(err);
    }
  }

  async function handleComplete(id) {
    try {
      await updateTaskStatus(id, "Completed");
      fetchTasks();
      // await regeneratePlan();
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit(task) {
    setEditingTask(task);
  }

  async function handleUpdate(id, task) {
    try {
      await updateTask(id, task);
      fetchTasks();
      await regeneratePlan();
      setEditingTask(null);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto py-10">

        <h1 className="text-4xl font-bold text-center mb-10">

          Task Manager

        </h1>

        <TaskForm
          onAdd={handleAddTask}
          editingTask={editingTask}
          onUpdate={handleUpdate}
        />

        <div className="mt-10">

          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onComplete={handleComplete}
            onEdit={handleEdit}
          />

        </div>

      </div>

    </div>
  );
}