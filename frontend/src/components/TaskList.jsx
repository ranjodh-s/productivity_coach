import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onDelete,
  onComplete,
  onEdit,
}) {

  if (!tasks.length)
    return (
      <div className="text-center text-gray-500 mt-20">
        No Tasks Yet
      </div>
    );

  return (
    <div className="grid gap-6">

      {tasks.map((task) => (

        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onComplete={onComplete}
          onEdit={onEdit}
        />

      ))}

    </div>
  );
}