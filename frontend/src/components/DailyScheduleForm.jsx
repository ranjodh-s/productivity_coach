import { useState } from "react";

export default function DailyScheduleForm({ onSave }) {
  const [schedule, setSchedule] = useState([
    {
      activity: "",
      startTime: "",
      endTime: "",
    },
  ]);

  function handleChange(index, field, value) {
    const updatedSchedule = [...schedule];

    updatedSchedule[index][field] = value;

    setSchedule(updatedSchedule);
  }

  function addActivity() {
    setSchedule([
      ...schedule,
      {
        activity: "",
        startTime: "",
        endTime: "",
      },
    ]);
  }

  function removeActivity(index) {
    const updatedSchedule = schedule.filter(
      (_, i) => i !== index
    );

    setSchedule(updatedSchedule);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onSave(schedule);
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        Daily Routine
      </h2>

      <form onSubmit={handleSubmit}>

        {schedule.map((item, index) => (

          <div
            key={index}
            className="grid grid-cols-4 gap-4 mb-4"
          >

            <input
              type="text"
              placeholder="Activity"
              value={item.activity}
              onChange={(e) =>
                handleChange(
                  index,
                  "activity",
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            />

            <input
              type="time"
              value={item.startTime}
              onChange={(e) =>
                handleChange(
                  index,
                  "startTime",
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            />

            <input
              type="time"
              value={item.endTime}
              onChange={(e) =>
                handleChange(
                  index,
                  "endTime",
                  e.target.value
                )
              }
              className="border rounded-lg p-3"
            />

            <button
              type="button"
              onClick={() =>
                removeActivity(index)
              }
              className="bg-red-500 text-white rounded-lg"
            >
              Remove
            </button>

          </div>

        ))}

        <div className="flex gap-4 mt-6">

          <button
            type="button"
            onClick={addActivity}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Add Activity
          </button>

          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            Save Schedule
          </button>

        </div>

      </form>

    </div>
  );
}