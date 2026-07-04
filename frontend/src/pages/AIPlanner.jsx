import { useEffect, useState } from "react";

import AiDashboard from "../components/AiDashboard";

import {  getTodayPlan, regeneratePlan } from "../services/aiApi";



import {
    getTasks
} from "../services/taskApi";

import {
    getSchedule
} from "../services/scheduleApi";

export default function AIPlanner() {

    const [tasks,setTasks]=useState([]);

    const [schedule,setSchedule]=useState([]);

    const [aiData,setAiData]=useState(null);

    const [loading,setLoading]=useState(false);

    useEffect(()=>{

        fetchData();

    },[]);

    async function fetchData(){

        const taskRes=
        await getTasks();

        const scheduleRes=
        await getSchedule();

        setTasks(taskRes.data);

        setSchedule(scheduleRes.data);

    }

     useEffect(()=>{

    loadPlan();

},[]);

    async function loadPlan(){

    try{

        const response =
            await getTodayPlan();
            

        setAiData(response.data);

    }

    catch(err){

        console.log(err);

    }

}

    async function handleRegenerate(){

        try{

            setLoading(true);

            const response=
            await regeneratePlan();
           
            setAiData(response.data.answer);
            

        }

        catch(err){

            console.log(err);

        }

        finally{

            setLoading(false);

        }

    }

   

    const pending=
    tasks.filter(
        task=>task.status==="Pending"
    ).length;

    const completed=
    tasks.filter(
        task=>task.status==="Completed"
    ).length;

    return(

<div className="min-h-screen bg-slate-100">

<div className="max-w-7xl mx-auto py-10 px-5">

<h2 className="text-3xl font-bold mb-5">
AI Productivity Dashboard
</h2>

<div className="grid lg:grid-cols-3 gap-8">

{/* Left Panel */}

<div className="space-y-6">

{/* Stats */}

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-xl font-bold mb-5">

Today's Summary

</h2>

<div className="space-y-4">

<div className="flex justify-between">

<span>Pending</span>

<span>{pending}</span>

</div>

<div className="flex justify-between">

<span>Completed</span>

<span>{completed}</span>

</div>

<div className="flex justify-between">

<span>Routine Items</span>

<span>{schedule.length}</span>

</div>

</div>

</div>

{/* Routine */}

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-xl font-bold mb-5">

Today's Routine

</h2>

<div className="space-y-3">

{

schedule.map(item=>(

<div
key={item.id}
className="border-b pb-2"
>

<p className="font-semibold">

{item.activity}

</p>

<p className="text-gray-500">

{item.start_time}

-

{item.end_time}

</p>

</div>

))

}

</div>

</div>

{/* Actions */}

<div className="bg-white rounded-xl shadow p-6">

<h2 className="text-xl font-bold mb-5">

Quick Actions

</h2>

<div className="space-y-4">

<button
onClick={handleRegenerate}
className="w-full bg-green-600 text-white rounded-lg py-3"
>

{

loading

?

"Regenerating..."

:

"Regenerate Plan"

}

</button>

</div>

</div>

</div>

{/* Right Panel */}


<div className="lg:col-span-2">

{

!aiData ?

(

<div className="bg-white rounded-xl shadow h-full flex items-center justify-center">

<p className="text-gray-500 text-xl">

Click Generate AI Schedule

</p>

</div>

)

:

(

<AiDashboard
data={aiData}
/>

)

}

</div>

</div>

</div>

</div>

    );

}