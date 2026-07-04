import { useEffect, useState } from "react";

import DailyScheduleForm from "../components/DailyScheduleForm";

import {
  saveSchedule,
  getSchedule,
  deleteSchedule,
} from "../services/scheduleApi";
import { regeneratePlan } from "../services/aiApi";

export default function DailyRoutine() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    fetchSchedule();
  }, []);

  async function fetchSchedule() {
    try {
      const response = await getSchedule();
      setSchedule(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSaveSchedule(newSchedule) {
    try {
      
      await saveSchedule(newSchedule);
      fetchSchedule();
      alert("Schedule Saved!");
      await regeneratePlan();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteSchedule(id);

      fetchSchedule();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto py-10 px-4">

        <h1 className="text-4xl font-bold text-center mb-10">
          Daily Routine
        </h1>

        <DailyScheduleForm
          onSave={handleSaveSchedule}
        />

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Today's Routine
          </h2>

          {schedule.length === 0 ? (

            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
              No activities added yet.
            </div>

          ) : (

            <div className="space-y-4">

              {schedule.map((activity) => (

                <div
                  key={activity.id}
                  className="bg-white rounded-xl shadow-md p-5 flex justify-between items-center hover:shadow-lg transition"
                >

                  <div>

                    <h3 className="text-xl font-semibold">

                      {activity.activity}

                    </h3>

                    <p className="text-gray-500 mt-1">

                      {activity.start_time}

                      {" - "}

                      {activity.end_time}

                    </p>

                  </div>

                  <button
                    onClick={() =>
                      handleDelete(activity.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}