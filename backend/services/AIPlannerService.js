import { getPendingTasksDB } from "../models/taskModel.js";
import { getScheduleDB } from "../models/scheduleModel.js";
import { saveAIPlanDB } from "../models/aiScheduleModel.js";

import { prioritizeTasks } from "./geminiService.js";

export async function generateAISchedule(userId) {

    try {

        // Get only this user's pending tasks
        const tasks = await getPendingTasksDB(userId);

        // Get only this user's daily routine
        const schedule = await getScheduleDB(userId);

        const currentDate = new Date().toLocaleDateString("en-IN");

        //     let aiPlan = {
        //   "tips": [
        //     {
        //       "title": "Enhance Task Details",
        //       "description": "To improve future scheduling accuracy, consider adding descriptions, estimated work required, and importance levels to your tasks."
        //     },
        //     {
        //       "title": "Establish a Daily Routine",
        //       "description": "Adding a consistent daily routine (e.g., wake-up, meal times, regular breaks) will allow for more precise scheduling and help prevent burnout."
        //     },
        //     {
        //       "title": "Monitor Progress",
        //       "description": "Regularly check in on your tasks. If you finish something early or take longer than expected, adjust your schedule accordingly to stay agile."
        //     }
        //   ],
        //   "risks": [
        //     {
        //       "title": "Assignment Deadline",
        //       "severity": "High",
        //       "description": "Task 'assignment' (ID 3) is due today at 18:30 UTC. While scheduled, any unexpected delays could jeopardize completion."
        //     },
        //     {
        //       "title": "Hackathon Project Deadline",
        //       "severity": "Medium",
        //       "description": "Task 'hackathon project submit' (ID 4) is due tomorrow. The estimated 4 hours are spread over two days, but it's important to stick to the schedule to avoid last-minute rush."
        //     }
        //   ],
        //   "summary": {
        //     "urgentTaskCount": 2,
        //     "productivityScore": 88,
        //     "estimatedWorkHours": 7.5,
        //     "completionProbability": 95
        //   },
        //   "freeSlots": [
        //     {
        //       "endTime": "2026-06-27T08:00:00.000Z",
        //       "startTime": "2026-06-27T00:00:00.000Z"
        //     },
        //     {
        //       "endTime": "2026-06-27T23:59:00.000Z",
        //       "startTime": "2026-06-27T14:30:00.000Z"
        //     },
        //     {
        //       "endTime": "2026-06-28T08:00:00.000Z",
        //       "startTime": "2026-06-28T00:00:00.000Z"
        //     },
        //     {
        //       "endTime": "2026-06-28T23:59:00.000Z",
        //       "startTime": "2026-06-28T10:40:00.000Z"
        //     }
        //   ],
        //   "motivation": {
        //     "message": "You have a clear plan to tackle your urgent tasks and stay on top of your responsibilities. Stay focused, take your breaks, and you'll achieve great productivity!"
        //   },
        //   "urgentTasks": [
        //     {
        //       "title": "assignment",
        //       "reason": "Due today, critical to complete promptly.",
        //       "taskId": 3,
        //       "deadline": "2026-06-27T18:30:00.000Z",
        //       "daysRemaining": 0
        //     },
        //     {
        //       "title": "hackathon project submit",
        //       "reason": "Due tomorrow, requires significant focus and early start.",
        //       "taskId": 4,
        //       "deadline": "2026-06-28T18:30:00.000Z",
        //       "daysRemaining": 1
        //     }
        //   ],
        //   "priorityOrder": [
        //     {
        //       "rank": 1,
        //       "title": "assignment",
        //       "reason": "Highest urgency, due today (2026-06-27T18:30:00.000Z). Must be completed first.",
        //       "taskId": 3,
        //       "priority": "Medium",
        //       "riskLevel": "High",
        //       "estimatedTime": "2 hours"
        //     },
        //     {
        //       "rank": 2,
        //       "title": "hackathon project submit",
        //       "reason": "Second highest urgency, due tomorrow (2026-06-28T18:30:00.000Z). Requires significant effort, best split across two days.",
        //       "taskId": 4,
        //       "priority": "Medium",
        //       "riskLevel": "Medium",
        //       "estimatedTime": "4 hours"
        //     },
        //     {
        //       "rank": 3,
        //       "title": "dsa practice",
        //       "reason": "No immediate deadline, but important for continuous skill development. Scheduled after urgent tasks.",
        //       "taskId": 5,
        //       "priority": "Medium",
        //       "riskLevel": "Low",
        //       "estimatedTime": "1.5 hours"
        //     }
        //   ],
        //   "todaySchedule": [
        //     {
        //       "task": "assignment (Part 1)",
        //       "reason": "Prioritizing the most urgent task due today. Breaking it into a focused session.",
        //       "endTime": "2026-06-27T09:30:00.000Z",
        //       "startTime": "2026-06-27T08:00:00.000Z"
        //     },
        //     {
        //       "task": "Break",
        //       "reason": "A 10-minute break after 90 minutes of focused work to maintain concentration.",
        //       "endTime": "2026-06-27T09:40:00.000Z",
        //       "startTime": "2026-06-27T09:30:00.000Z"
        //     },
        //     {
        //       "task": "assignment (Part 2)",
        //       "reason": "Completing the assignment to ensure it's done well before the 18:30 UTC deadline.",
        //       "endTime": "2026-06-27T10:10:00.000Z",
        //       "startTime": "2026-06-27T09:40:00.000Z"
        //     },
        //     {
        //       "task": "hackathon project submit (Part 1)",
        //       "reason": "Starting the hackathon project early due to tomorrow's deadline. Splitting the work over two days for better manageability.",
        //       "endTime": "2026-06-27T11:40:00.000Z",
        //       "startTime": "2026-06-27T10:10:00.000Z"
        //     },
        //     {
        //       "task": "Break",
        //       "reason": "A 10-minute break after 90 minutes of focused work.",
        //       "endTime": "2026-06-27T11:50:00.000Z",
        //       "startTime": "2026-06-27T11:40:00.000Z"
        //     },
        //     {
        //       "task": "hackathon project submit (Part 2)",
        //       "reason": "Continuing progress on the hackathon project, allocating 2 hours of work for today.",
        //       "endTime": "2026-06-27T12:50:00.000Z",
        //       "startTime": "2026-06-27T11:50:00.000Z"
        //     },
        //     {
        //       "task": "dsa practice",
        //       "reason": "Fitting in a session for ongoing DSA practice. It has no strict deadline, making it suitable after urgent tasks.",
        //       "endTime": "2026-06-27T14:20:00.000Z",
        //       "startTime": "2026-06-27T12:50:00.000Z"
        //     },
        //     {
        //       "task": "Break",
        //       "reason": "A 10-minute break after 90 minutes of focused work.",
        //       "endTime": "2026-06-27T14:30:00.000Z",
        //       "startTime": "2026-06-27T14:20:00.000Z"
        //     }
        //   ],
        //   "upcomingSchedule": [
        //     {
        //       "date": "2026-06-28",
        //       "tasks": [
        //         {
        //           "task": "hackathon project submit (Part 3)",
        //           "reason": "Resuming the hackathon project to ensure completion before the 18:30 UTC deadline on 28/6/2026.",
        //           "endTime": "2026-06-28T09:30:00.000Z",
        //           "startTime": "2026-06-28T08:00:00.000Z"
        //         },
        //         {
        //           "task": "Break",
        //           "reason": "A 10-minute break after 90 minutes of focused work.",
        //           "endTime": "2026-06-28T09:40:00.000Z",
        //           "startTime": "2026-06-28T09:30:00.000Z"
        //         },
        //         {
        //           "task": "hackathon project submit (Part 4)",
        //           "reason": "Finalizing the hackathon project submission, allocating the remaining estimated time.",
        //           "endTime": "2026-06-28T10:40:00.000Z",
        //           "startTime": "2026-06-28T09:40:00.000Z"
        //         }
        //       ]
        //     }
        //   ]
        // }
        

        // Ask Gemini to generate a schedule
        let aiPlan = await prioritizeTasks(
            tasks,
            schedule,
            currentDate
        );

        // Remove markdown if Gemini returns it
        aiPlan = aiPlan
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        aiPlan = JSON.parse(aiPlan);

        // Save schedule for this user
        await saveAIPlanDB(userId, aiPlan);

        return aiPlan;

    } catch (error) {

        console.error("AI Planner Error:", error);

        throw error;

    }

}
        
        //     let aiPlan = {
        //   "tips": [
        //     {
        //       "title": "Enhance Task Details",
        //       "description": "To improve future scheduling accuracy, consider adding descriptions, estimated work required, and importance levels to your tasks."
        //     },
        //     {
        //       "title": "Establish a Daily Routine",
        //       "description": "Adding a consistent daily routine (e.g., wake-up, meal times, regular breaks) will allow for more precise scheduling and help prevent burnout."
        //     },
        //     {
        //       "title": "Monitor Progress",
        //       "description": "Regularly check in on your tasks. If you finish something early or take longer than expected, adjust your schedule accordingly to stay agile."
        //     }
        //   ],
        //   "risks": [
        //     {
        //       "title": "Assignment Deadline",
        //       "severity": "High",
        //       "description": "Task 'assignment' (ID 3) is due today at 18:30 UTC. While scheduled, any unexpected delays could jeopardize completion."
        //     },
        //     {
        //       "title": "Hackathon Project Deadline",
        //       "severity": "Medium",
        //       "description": "Task 'hackathon project submit' (ID 4) is due tomorrow. The estimated 4 hours are spread over two days, but it's important to stick to the schedule to avoid last-minute rush."
        //     }
        //   ],
        //   "summary": {
        //     "urgentTaskCount": 2,
        //     "productivityScore": 88,
        //     "estimatedWorkHours": 7.5,
        //     "completionProbability": 95
        //   },
        //   "freeSlots": [
        //     {
        //       "endTime": "2026-06-27T08:00:00.000Z",
        //       "startTime": "2026-06-27T00:00:00.000Z"
        //     },
        //     {
        //       "endTime": "2026-06-27T23:59:00.000Z",
        //       "startTime": "2026-06-27T14:30:00.000Z"
        //     },
        //     {
        //       "endTime": "2026-06-28T08:00:00.000Z",
        //       "startTime": "2026-06-28T00:00:00.000Z"
        //     },
        //     {
        //       "endTime": "2026-06-28T23:59:00.000Z",
        //       "startTime": "2026-06-28T10:40:00.000Z"
        //     }
        //   ],
        //   "motivation": {
        //     "message": "You have a clear plan to tackle your urgent tasks and stay on top of your responsibilities. Stay focused, take your breaks, and you'll achieve great productivity!"
        //   },
        //   "urgentTasks": [
        //     {
        //       "title": "assignment",
        //       "reason": "Due today, critical to complete promptly.",
        //       "taskId": 3,
        //       "deadline": "2026-06-27T18:30:00.000Z",
        //       "daysRemaining": 0
        //     },
        //     {
        //       "title": "hackathon project submit",
        //       "reason": "Due tomorrow, requires significant focus and early start.",
        //       "taskId": 4,
        //       "deadline": "2026-06-28T18:30:00.000Z",
        //       "daysRemaining": 1
        //     }
        //   ],
        //   "priorityOrder": [
        //     {
        //       "rank": 1,
        //       "title": "assignment",
        //       "reason": "Highest urgency, due today (2026-06-27T18:30:00.000Z). Must be completed first.",
        //       "taskId": 3,
        //       "priority": "Medium",
        //       "riskLevel": "High",
        //       "estimatedTime": "2 hours"
        //     },
        //     {
        //       "rank": 2,
        //       "title": "hackathon project submit",
        //       "reason": "Second highest urgency, due tomorrow (2026-06-28T18:30:00.000Z). Requires significant effort, best split across two days.",
        //       "taskId": 4,
        //       "priority": "Medium",
        //       "riskLevel": "Medium",
        //       "estimatedTime": "4 hours"
        //     },
        //     {
        //       "rank": 3,
        //       "title": "dsa practice",
        //       "reason": "No immediate deadline, but important for continuous skill development. Scheduled after urgent tasks.",
        //       "taskId": 5,
        //       "priority": "Medium",
        //       "riskLevel": "Low",
        //       "estimatedTime": "1.5 hours"
        //     }
        //   ],
        //   "todaySchedule": [
        //     {
        //       "task": "assignment (Part 1)",
        //       "reason": "Prioritizing the most urgent task due today. Breaking it into a focused session.",
        //       "endTime": "2026-06-27T09:30:00.000Z",
        //       "startTime": "2026-06-27T08:00:00.000Z"
        //     },
        //     {
        //       "task": "Break",
        //       "reason": "A 10-minute break after 90 minutes of focused work to maintain concentration.",
        //       "endTime": "2026-06-27T09:40:00.000Z",
        //       "startTime": "2026-06-27T09:30:00.000Z"
        //     },
        //     {
        //       "task": "assignment (Part 2)",
        //       "reason": "Completing the assignment to ensure it's done well before the 18:30 UTC deadline.",
        //       "endTime": "2026-06-27T10:10:00.000Z",
        //       "startTime": "2026-06-27T09:40:00.000Z"
        //     },
        //     {
        //       "task": "hackathon project submit (Part 1)",
        //       "reason": "Starting the hackathon project early due to tomorrow's deadline. Splitting the work over two days for better manageability.",
        //       "endTime": "2026-06-27T11:40:00.000Z",
        //       "startTime": "2026-06-27T10:10:00.000Z"
        //     },
        //     {
        //       "task": "Break",
        //       "reason": "A 10-minute break after 90 minutes of focused work.",
        //       "endTime": "2026-06-27T11:50:00.000Z",
        //       "startTime": "2026-06-27T11:40:00.000Z"
        //     },
        //     {
        //       "task": "hackathon project submit (Part 2)",
        //       "reason": "Continuing progress on the hackathon project, allocating 2 hours of work for today.",
        //       "endTime": "2026-06-27T12:50:00.000Z",
        //       "startTime": "2026-06-27T11:50:00.000Z"
        //     },
        //     {
        //       "task": "dsa practice",
        //       "reason": "Fitting in a session for ongoing DSA practice. It has no strict deadline, making it suitable after urgent tasks.",
        //       "endTime": "2026-06-27T14:20:00.000Z",
        //       "startTime": "2026-06-27T12:50:00.000Z"
        //     },
        //     {
        //       "task": "Break",
        //       "reason": "A 10-minute break after 90 minutes of focused work.",
        //       "endTime": "2026-06-27T14:30:00.000Z",
        //       "startTime": "2026-06-27T14:20:00.000Z"
        //     }
        //   ],
        //   "upcomingSchedule": [
        //     {
        //       "date": "2026-06-28",
        //       "tasks": [
        //         {
        //           "task": "hackathon project submit (Part 3)",
        //           "reason": "Resuming the hackathon project to ensure completion before the 18:30 UTC deadline on 28/6/2026.",
        //           "endTime": "2026-06-28T09:30:00.000Z",
        //           "startTime": "2026-06-28T08:00:00.000Z"
        //         },
        //         {
        //           "task": "Break",
        //           "reason": "A 10-minute break after 90 minutes of focused work.",
        //           "endTime": "2026-06-28T09:40:00.000Z",
        //           "startTime": "2026-06-28T09:30:00.000Z"
        //         },
        //         {
        //           "task": "hackathon project submit (Part 4)",
        //           "reason": "Finalizing the hackathon project submission, allocating the remaining estimated time.",
        //           "endTime": "2026-06-28T10:40:00.000Z",
        //           "startTime": "2026-06-28T09:40:00.000Z"
        //         }
        //       ]
        //     }
        //   ]
        // }