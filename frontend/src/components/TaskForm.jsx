import { useEffect, useState } from "react";

export default function TaskForm({
  onAdd,
  editingTask,
  onUpdate,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setPriority(editingTask.priority || "Medium");
      setDueDate(
        editingTask.due_date
          ? editingTask.due_date.split("T")[0]
          : ""
      );
    }
  }, [editingTask]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const task = {
      title,
      description,
      priority,
      deadline: dueDate,
    };

    if (editingTask) {
      await onUpdate(editingTask.id, task);
    } else {
      await onAdd(task);
    }

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          className="w-full border rounded-lg p-3 h-28 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            className="border rounded-lg p-3"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            className="border rounded-lg p-3"
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white w-full rounded-lg py-3 font-semibold transition"
        >
          {editingTask
            ? "Update Task"
            : "Add Task"}
        </button>
      </form>
    </div>
  );
}