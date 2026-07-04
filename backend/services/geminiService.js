import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export async function prioritizeTasks(tasks,schedule,currentDate) {

    const prompt = `
You are an expert AI Productivity Coach similar to Motion AI, Reclaim AI, and Sunsama.

Your job is to analyze the user's tasks and daily routine to create the most efficient work schedule.

Current Date:
${currentDate}

User's Daily Routine:
${JSON.stringify(schedule, null, 2)}

Pending Tasks:
${JSON.stringify(tasks, null, 2)}

Rules:

1. Never schedule work during existing activities.
2. Find all available free time slots.
3. Prioritize tasks using:

   * Deadline
   * Priority
   * Estimated work required
   * Importance
4. Schedule urgent tasks first.
5. Break long tasks into multiple focus sessions if needed.
6. Add a 10-minute break after every 50–90 minutes of work.
7. Avoid scheduling difficult tasks immediately after long existing activities (for example, after college or work).
8. If there isn't enough time today, schedule remaining work for upcoming days.
9. Explain WHY each task is placed in that time slot.
10. Detect overloaded days and suggest moving work to another day.
11. Calculate an estimated productivity score (0-100) based on:

    * Completed tasks
    * Pending tasks
    * Deadline pressure
    * Workload balance
    * Number of urgent tasks
12. Estimate the probability of finishing all tasks before their deadlines.
13. Suggest improvements to the user's schedule.
14. Warn about deadline risks.
15. If a task cannot be completed before its deadline, clearly mention it.
16. Keep responses concise and practical.

Return ONLY valid JSON.

Do NOT return Markdown.

Do NOT explain anything outside JSON.

Return exactly this structure:

{
"summary": {
"productivityScore": 0,
"urgentTaskCount": 0,
"estimatedWorkHours": 0,
"completionProbability": 0
},

"freeSlots": [
{
"startTime": "",
"endTime": ""
}
],

"priorityOrder": [
{
"rank": 1,
"taskId": 0,
"title": "",
"priority": "",
"reason": "",
"estimatedTime": "",
"riskLevel": ""
}
],

"todaySchedule": [
{
"startTime": "",
"endTime": "",
"task": "",
"reason": ""
}
],

"upcomingSchedule": [
{
"date": "",
"tasks": [
{
"startTime": "",
"endTime": "",
"task": "",
"reason": ""
}
]
}
],

"urgentTasks": [
{
"taskId": 0,
"title": "",
"deadline": "",
"daysRemaining": 0,
"reason": ""
}
],

"risks": [
{
"title": "",
"description": "",
"severity": ""
}
],

"tips": [
{
"title": "",
"description": ""
}
],

"motivation": {
"message": ""
}
}

`;

    const response =
        await ai.models.generateContent({

            model:"gemini-2.5-flash",

            contents:prompt

        });

    return response.text;
}