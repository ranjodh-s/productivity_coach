export default function TaskItem({
  task,
  onDelete,
  onComplete,
  onEdit,
}) {

  const priorityColor = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <h3 className="text-xl font-bold">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColor[task.priority]}`}
        >
          {task.priority}
        </span>

      </div>

      <p className="text-gray-600 mt-3">
        {task.description || "No description"}
      </p>

      <div className="flex justify-between mt-5">

        <div>

          <p>

            <strong>Status:</strong>{" "}

            <span
              className={
                task.status === "Completed"
                  ? "text-green-600"
                  : "text-orange-500"
              }
            >
              {task.status}
            </span>

          </p>

          <p className="text-gray-500">

            Due:
            {" "}
            {task.due_date
              ? new Date(task.due_date).toLocaleDateString()
              : "Not Set"}

          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onComplete(task.id)}
            disabled={task.status === "Completed"}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
          >
            ✓
          </button>

          <button
            onClick={() => onEdit(task)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}