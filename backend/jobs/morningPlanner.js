import cron from "node-cron";

import {
    generateAISchedule
} from "../services/AIPlannerService.js";

export function startMorningPlanner(){

    cron.schedule(

        "0 7 * * *",

        async()=>{

            console.log("Generating AI Schedule...");

            try{

                await generateAISchedule();

                console.log("Today's AI Schedule Generated.");

            }

            catch(err){

                console.log(err);

            }

        }

    );

}