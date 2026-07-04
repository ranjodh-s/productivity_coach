import {
  saveScheduleDB,
  getScheduleDB,
  updateScheduleDB,
  deleteScheduleDB,
} from "../models/scheduleModel.js";

import { generateAISchedule } from "../services/AIPlannerService.js";


// ==========================
// Save Schedule
// ==========================

export const saveSchedule = async (req, res) => {

  try {

    const userId = req.user.id;

    const { schedule } = req.body;

    if (!schedule || schedule.length === 0) {

      return res.status(400).json({
        message: "Schedule is required",
      });

    }
    const result = await saveScheduleDB(
      userId,
      schedule
    );


    // await generateAISchedule(userId);

    res.status(201).json({

      message: "Schedule saved successfully",

      schedule: result,

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Failed to save schedule",

    });

  }

};


// ==========================
// Get Schedule
// ==========================

export const getSchedule = async (req, res) => {

  try {

    const userId = req.user.id;

    const schedule = await getScheduleDB(userId);

    res.status(200).json(schedule);

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Failed to fetch schedule",

    });

  }

};


// ==========================
// Update Activity
// ==========================

export const updateSchedule = async (req, res) => {

  try {

    const userId = req.user.id;

    const { id } = req.params;

    const {

      activity,

      startTime,

      endTime,

    } = req.body;

    const updatedSchedule = await updateScheduleDB(

      id,

      userId,

      activity,

      startTime,

      endTime

    );

    if (!updatedSchedule) {

      return res.status(404).json({

        message: "Activity not found",

      });

    }

    await generateAISchedule(userId);

    res.status(200).json({

      message: "Schedule updated successfully",

      schedule: updatedSchedule,

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Failed to update schedule",

    });

  }

};


// ==========================
// Delete Activity
// ==========================

export const deleteSchedule = async (req, res) => {

  try {

    const userId = req.user.id;

    const { id } = req.params;

    const deleted = await deleteScheduleDB(

      id,

      userId

    );

    if (!deleted) {

      return res.status(404).json({

        message: "Activity not found",

      });

    }

    await generateAISchedule(userId);

    res.status(200).json({

      message: "Activity deleted successfully",

    });

  }

  catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Failed to delete schedule",

    });

  }

};




// import {
//   saveScheduleDB,
//   getScheduleDB,
//   updateScheduleDB,
//   deleteScheduleDB,
// } from "../models/scheduleModel.js";

// // Save Schedule
// export const saveSchedule = async (req, res) => {
//   try {
//     const { schedule } = req.body;

//     if (!schedule || schedule.length === 0) {
//       return res.status(400).json({
//         message: "Schedule is required",
//       });
//     }

//     const result = await saveScheduleDB(schedule,UserId);

//     res.status(201).json({
//       message: "Schedule saved successfully",
//       schedule: result,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to save schedule",
//     });
//   }
// };

// // Get Schedule
// export const getSchedule = async (req, res) => {
//   try {
//     const schedule = await getScheduleDB();

//     res.status(200).json(schedule);
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to fetch schedule",
//     });
//   }
// };

// // Update Activity
// export const updateSchedule = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       activity,
//       startTime,
//       endTime,
//     } = req.body;

//     const updatedSchedule = await updateScheduleDB(
//       id,
//       activity,
//       startTime,
//       endTime
//     );

//     if (!updatedSchedule) {
//       return res.status(404).json({
//         message: "Activity not found",
//       });
//     }

//     res.status(200).json({
//       message: "Schedule updated successfully",
//       schedule: updatedSchedule,
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to update schedule",
//     });
//   }
// };

// // Delete Activity
// export const deleteSchedule = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await deleteScheduleDB(id);

//     if (!deleted) {
//       return res.status(404).json({
//         message: "Activity not found",
//       });
//     }

//     res.status(200).json({
//       message: "Activity deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to delete schedule",
//     });
//   }
// };