import { useState } from "react";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { updateTaskStatus } from "../services/taskApi";

export default function PendingTasks({
    tasks,
    setTasks,
    refreshDashboard
}) {


    const [loadingId, setLoadingId] = useState(null);

    const pendingTasks = tasks
        .filter(task => task.status === "Pending")
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));


    async function completeTask(id) {

        try {

            setLoadingId(id);

            await updateTaskStatus(id, {
                status: "Completed"
            });

            // Update UI immediately
            const updatedTasks = tasks.map(task =>

                task.id === id
                    ? { ...task, status: "Completed" }
                    : task

            );

            setTasks(updatedTasks);

            // Refresh dashboard (AI Schedule + KPI Cards)
            if (refreshDashboard) {

                await refreshDashboard();

            }

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoadingId(null);

        }

    }

    return (

        <div className="bg-white rounded-xl shadow-lg p-6">

            <div className="flex justify-between items-center mb-6" >

                <h2 className="text-2xl font-bold">

                    Pending Tasks

                </h2>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">

                    {pendingTasks.length}

                </span>

            </div>

            {

                pendingTasks.length === 0 ?

                (

                    <div className="text-center py-10">

                        <h2 className="text-2xl">

                            🎉 All Tasks Completed

                        </h2>

                    </div>

                )

                :

                (

                    <div className="space-y-5" style={{ maxHeight: "600px", overflowY: "auto" }}>

                        {

                            pendingTasks.map(task => (

                                <div

                                    key={task.id}

                                    className="border rounded-xl p-5 hover:shadow-md transition"

                                >

                                    <div className="flex justify-between">

                                        <div>

                                            <h3 className="font-bold text-lg">

                                                {task.title}

                                            </h3>

                                            {

                                                task.description &&

                                                <p className="text-gray-500 mt-2">

                                                    {task.description}

                                                </p>

                                            }

                                        </div>

                                        <PriorityBadge
                                            priority={task.priority}
                                        />

                                    </div>

                                    <div className="flex justify-between items-center mt-5">

                                        <div className="space-y-1">

                                            <div className="flex items-center gap-2 text-gray-600">

                                                <Clock size={16} />

                                                {

                                                    task.deadline

                                                        ?

                                                        new Date(task.deadline)
                                                            .toLocaleDateString()

                                                        :

                                                        "No Deadline"

                                                }

                                            </div>

                                            <div className="text-gray-600">

                                                Estimated Hours :

                                                {" "}

                                                {task.estimated_hours || 0}

                                            </div>

                                        </div>

                                        <button

                                            onClick={() => completeTask(task.id)}

                                            disabled={loadingId === task.id}

                                            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"

                                        >

                                            <CheckCircle size={18} />

                                            {

                                                loadingId === task.id

                                                    ?

                                                    "Updating..."

                                                    :

                                                    "Complete"

                                            }

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

function PriorityBadge({ priority }) {

    const colors = {

        High: "bg-red-100 text-red-700",

        Medium: "bg-yellow-100 text-yellow-700",

        Low: "bg-green-100 text-green-700"

    };

    return (

        <span

            className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[priority]}`}

        >

            <AlertTriangle
                size={14}
                className="inline mr-1"
            />

            {priority}

        </span>

    );

}