export default function AiDashboard({ data }) {

    if (!data) return null;

    return (

        <div className="mt-10 space-y-8">

            {/* Summary */}

            <div>

                

                <div className="grid md:grid-cols-4 gap-5">

                    <div className="bg-blue-600 text-white rounded-xl p-5 shadow">

                        <h3 className="text-sm">

                            Productivity Score

                        </h3>

                        <p className="text-4xl font-bold">

                            {data.summary.productivityScore}%

                        </p>

                    </div>

                    <div className="bg-red-500 text-white rounded-xl p-5">

                        <h3>

                            Urgent Tasks

                        </h3>

                        <p className="text-4xl font-bold">

                            {data.summary.urgentTaskCount}

                        </p>

                    </div>

                    <div className="bg-green-500 text-white rounded-xl p-5">

                        <h3>

                            Estimated Hours

                        </h3>

                        <p className="text-4xl font-bold">

                            {data.summary.estimatedWorkHours}

                        </p>

                    </div>

                    <div className="bg-purple-500 text-white rounded-xl p-5">

                        <h3>

                            Completion Chance

                        </h3>

                        <p className="text-4xl font-bold">

                            {data.summary.completionProbability}%

                        </p>

                    </div>

                </div>

            </div>


            {/* Today's Schedule */}

            <div className="bg-white rounded-xl shadow p-6" >

                <h2 className="text-2xl font-bold mb-4" >

                    Today's Schedule

                </h2>

                <div style={{ maxHeight: '400px', overflowY: 'auto'}}>
                {

                    data.todaySchedule.map(item=>(

                        <div
                            key={item.startTime}
                            className="flex justify-between border-b py-3"
                        >

                            <div>

                                <h3>

                                    {item.task}

                                </h3>

                                <p className="text-gray-500">

                                    {item.reason}

                                </p>

                            </div>

                            <div>

                                {item.startTime}

                                -

                                {item.endTime}

                            </div>

                        </div>

                    ))

                }
                </div>

            </div>



            {/* Priority */}

            <div className="bg-white rounded-xl shadow p-6" >

                <h2 className="text-2xl font-bold mb-4">

                    Priority Order

                </h2>

                <div style={{ maxHeight: '400px', overflowY: 'auto'}}>
                {

                    data.priorityOrder.map(task=>(

                        <div
                            key={task.taskId}
                            className="border-b py-4"
                        >

                            <div className="flex justify-between">

                                <h3 className="font-semibold">

                                    #{task.rank} {task.title}

                                </h3>

                                <span className="bg-red-100 text-red-700 px-3 rounded-full">

                                    {task.priority}

                                </span>

                            </div>

                            <p>

                                {task.reason}

                            </p>

                            <p className="text-gray-500">

                                Estimated Time :

                                {task.estimatedTime}

                            </p>

                        </div>

                    ))

                }
                </div>

            </div>



            



            {/* Urgent Tasks */}

            <div className="bg-white rounded-xl shadow p-6" >

                <h2 className="text-2xl font-bold mb-4">

                    Urgent Tasks

                </h2>

                <div style={{ maxHeight: '400px', overflowY: 'auto'}}>

                {

                    data.urgentTasks.map(task=>(

                        <div
                            key={task.taskId}
                            className="border-l-4 border-red-500 pl-4 py-3 mb-4 bg-red-50"
                        >

                            <h3 className="font-semibold">

                                {task.title}

                            </h3>

                            <p>

                                Deadline :

                                {task.deadline}

                            </p>

                            <p>

                                {task.reason}

                            </p>

                        </div>

                    ))

                }
                </div>

            </div>



            {/* Risks */}

            <div className="bg-white rounded-xl shadow p-6" >

                <h2 className="text-2xl font-bold mb-4">

                    Risk Analysis

                </h2>
                <div style={{ maxHeight: '400px', overflowY: 'auto'}}>
                {

                    data.risks.map((risk,index)=>(

                        <div
                            key={index}
                            className="mb-4"
                        >

                            <h3 className="font-semibold text-red-600">

                                {risk.title}

                            </h3>

                            <p>

                                {risk.description}

                            </p>

                        </div>

                    ))

                }
                </div>

            </div>



            {/* Tips */}

            <div className="bg-white rounded-xl shadow p-6" >

                <h2 className="text-2xl font-bold mb-4">

                    AI Tips

                </h2>

                <div style={{ maxHeight: '400px', overflowY: 'auto'}}>
                {

                    data.tips.map((tip,index)=>(

                        <div
                            key={index}
                            className="mb-4"
                        >

                            <h3 className="font-semibold">

                                {tip.title}

                            </h3>

                            <p>

                                {tip.description}

                            </p>

                        </div>

                    ))

                }
                </div>

            </div>



            {/* Motivation */}

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8">

                <h2 className="text-2xl font-bold">

                    Daily Motivation

                </h2>

                <p className="mt-4 text-lg">

                    {data.motivation.message}

                </p>

            </div>

        </div>

    );

}