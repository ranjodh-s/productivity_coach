import { useEffect, useState } from "react";
import { useRef } from "react";


export default function FocusMode() {

    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);

    const [isRunning, setIsRunning] = useState(false);

    const [completedSessions, setCompletedSessions] = useState(0);

    const [focusTask, setFocusTask] = useState("");

    const [notes, setNotes] = useState("");

    const [todayFocus, setTodayFocus] = useState(0);

    const alarmRef = useRef(new Audio("/sounds/alarm.wav"));


    useEffect(() => {

        let timer;

        if (isRunning) {

            timer = setInterval(() => {

                if (seconds > 0) {

                    setSeconds(seconds - 1);

                }

                else {

                    if (minutes === 0) {

                        clearInterval(timer);

                        setIsRunning(false);

                        const i=3;
                       
                        alarmRef.current.play();

                        setCompletedSessions(prev => prev + 1);

                        setTodayFocus(prev => prev + 25);



                        // alert("Focus Session Completed 🎉");

                    }

                    else {

                        setMinutes(minutes - 1);

                        setSeconds(59);

                    }

                }

            }, 1000);

        }

        return () => clearInterval(timer);

    }, [isRunning, minutes, seconds]);

    function startTimer() {
        setIsRunning(true);
    }

    function pauseTimer() {
        setIsRunning(false);
    }

    function resetTimer() {
        setIsRunning(false);
        setMinutes(25);
        setSeconds(0);
    }

    function setPomodoro(time) {
        setIsRunning(false);
        setMinutes(time);
        setSeconds(0);
    }

    return (<>

    

<div className="min-h-screen  bg-gray-10099">

<div className="max-w-6xl mx-auto py-10 px-6">

<h1 className="text-5xl font-bold text-center mb-10">

🎯 Focus Mode

</h1>

<div className="grid lg:grid-cols-3 gap-8">

{/* Left */}

<div className="space-y-6">

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold text-xl mb-4">

Current Focus

</h2>

<input

value={focusTask}

onChange={(e)=>setFocusTask(e.target.value)}

placeholder="What are you working on?"

className="w-full border rounded-lg p-3"

/>

</div>

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold text-xl mb-4">

Quick Timer

</h2>

<div className="grid grid-cols-3 gap-3">

<button
onClick={()=>setPomodoro(25)}
className="bg-blue-500 text-white py-2 rounded"
>

25 min

</button>

<button
onClick={()=>setPomodoro(50)}
className="bg-green-500 text-white py-2 rounded"
>

50 min

</button>

<button
onClick={()=>setPomodoro(90)}
className="bg-purple-500 text-white py-2 rounded"
>

90 min

</button>

</div>

</div>

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold text-xl mb-4">

Notes

</h2>

<textarea

rows="8"

value={notes}

onChange={(e)=>setNotes(e.target.value)}

className="w-full border rounded-lg p-3"

placeholder="Write anything..."

></textarea>

</div>

</div>

{/* Center */}

<div className="bg-white rounded-xl shadow p-10 flex flex-col items-center justify-center">

<div className="text-7xl font-bold">

{String(minutes).padStart(2,"0")}

:

{String(seconds).padStart(2,"0")}

</div>

<div className="flex gap-4 mt-10">

<button

onClick={startTimer}

className="bg-green-600 text-white px-6 py-3 rounded-lg"

>

Start

</button>

<button

onClick={pauseTimer}

className="bg-yellow-500 text-white px-6 py-3 rounded-lg"

>

Pause

</button>

<button

onClick={resetTimer}

className="bg-red-600 text-white px-6 py-3 rounded-lg"

>

Reset

</button>

</div>

</div>

{/* Right */}

<div className="space-y-6">

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold text-xl mb-5">

Today's Stats

</h2>

<div className="space-y-4">

<div className="flex justify-between">

<span>Focus Time</span>

<span>{todayFocus} min</span>

</div>

<div className="flex justify-between">

<span>Completed Sessions</span>

<span>{completedSessions}</span>

</div>

<div className="flex justify-between">

<span>Current Streak</span>

<span>🔥 {completedSessions}</span>

</div>

</div>

</div>

<div className="bg-white rounded-xl shadow p-6">

<h2 className="font-bold text-xl mb-4">

Motivation

</h2>

<p>

Stay focused.

Every uninterrupted session moves you closer to your goals.

</p>

</div>

</div>

</div>

</div>

</div>

</>

    );

}