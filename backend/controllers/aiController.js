import { getPendingTasksDB }
from "../models/taskModel.js";

import {
prioritizeTasks
}
from "../services/geminiService.js";

import {
getScheduleDB
}
from "../models/scheduleModel.js";

import {
    getTodayPlanDB
}
from "../models/aiScheduleModel.js";

import { generateAISchedule } from "../services/AIPlannerService.js";

// export const prioritize = async(req,res)=>{

//     try{

//         const tasks =
//         await getPendingTasksDB();

//         const currentDate = new Date().toISOString().split('T')[0];

//         const schedule = await getScheduleDB();

//         const answer =
//         await prioritizeTasks(tasks, schedule, currentDate);

//         res.json({

//             answer

//         });

//     }

//     catch(err){

//         console.log(err);

//         res.status(500).json({

//             message:err.message

//         });

//     }

// }


export async function getTodayPlan(req,res){

    try{
        
        const userId = req.user.id;

        const plan =
            await getTodayPlanDB(userId);
        if(!plan){

            return res.status(404).json({

                message:"Today's plan not generated."

            });

        }

        res.json(plan);

    }

    catch(err){

        console.log(err);

        res.status(500).json({

            message:err.message

        });

    }

}

export const regeneratePlan = async(req,res)=>{

    
            try{
                const userId = req.user.id;
                const response = await generateAISchedule(userId);                
                return res.json({answer:response});
                // return res.json({answer:result});
                // return res.json({answer:{summary:"AI Schedule Regenerated."}});
            }

            catch(err){

                console.log(err);

                return res.status(500).json({

                    message:err.message

                });

            }

        }