import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Brain,
  CalendarDays,
} from "lucide-react";

import { getTasks } from "../services/taskApi";
import { getTodayPlan } from "../services/aiApi";
import Card from "../components/Card";
import PendingTasks from "../components/PendingTasks";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [aiPlan, setAiPlan] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const taskRes = await getTasks();
      setTasks(taskRes.data);

      const planRes = await getTodayPlan();
      setAiPlan(planRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const urgentTasks =
    aiPlan?.summary?.urgentTaskCount || 0;

  const productivity =
    aiPlan?.summary?.productivityScore || 0;

  const estimatedHours =
    aiPlan?.summary?.estimatedWorkHours || 0;

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Welcome Back 👋
      </h1>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

        <Card
          title="Pending Tasks"
          value={pendingTasks}
          icon={<Clock size={28} />}
          color="bg-yellow-500"
          link="/tasks"
        />

        <Card
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle size={28} />}
          color="bg-green-500"
          link="/tasks"
        />

        <Card
          title="Productivity"
          value={`${productivity}%`}
          icon={<Brain size={28} />}
          color="bg-blue-500"
        />

        <Card
          title="Urgent Tasks"
          value={urgentTasks}
          icon={<AlertTriangle size={28} />}
          color="bg-red-500"
          link="/tasks"
        />

        <Card
          title="Estimated Hours"
          value={estimatedHours}
          icon={<CalendarDays size={28} />}
          color="bg-purple-500"
          link="/ai"
        />

      </div>

      {/* Schedule + Motivation */}

  <div className="grid lg:grid-cols-3 gap-8">

  {/* Left Column */}
  <div className="lg:col-span-2">

    {/* Today's Schedule */}

    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-5">
        Today's Schedule
      </h2>

      {
        aiPlan?.todaySchedule?.length > 0 ?

          aiPlan.todaySchedule.map((item, index) => (

            <div
              key={index}
              className="border-l-4 border-blue-500 pl-4 py-3 mb-4 bg-gray-50 rounded"
            >

              <div className="font-semibold">
                {item.startTime} - {item.endTime}
              </div>

              <div className="text-lg font-medium">
                {item.task}
              </div>

              <div className="text-gray-500 text-sm">
                {item.reason}
              </div>

            </div>

          ))

          :

          <p>No schedule generated yet.</p>

      }

    </div>

  </div>


  {/* Right Column */}

  <div className="space-y-8">

    {/* Daily Motivation */}

    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">

      <h2 className="text-2xl font-bold mb-4">

        Daily Motivation

      </h2>

      <p className="leading-8 text-lg">

        {

          aiPlan?.motivation?.message ||

          "Stay consistent. Every task completed moves you closer to your goals."

        }

      </p>

    </div>

    {/* Pending Tasks */}

    <PendingTasks
      tasks={tasks}
      setTasks={setTasks}
      refreshDashboard={loadDashboard}
    />

  </div>

</div>

    </div>
  );
  
  
}