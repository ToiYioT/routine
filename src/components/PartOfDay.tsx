
import React, { useContext } from 'react'
import { AppContext } from '../App'
import useRoutineData, { Routine, RoutineContext } from '../contexts/RoutineDataContext'
import TaskCard from './TaskCard'

type Props = {
    partOfDay: string
    endTime: string
}

export default function PartOfDay({ partOfDay, endTime }: Props) {

    const { data } = useRoutineData() as RoutineContext;
    const { pickedDate } = useContext(AppContext) as AppContext;

    return (
        <div className="part-of-day-container">
            <div className="part-of-day-header">
                <div className="part-of-day-name">
                    {partOfDay}
                </div>
                <div className="part-of-day-till-time">
                    till {endTime}
                </div>
            </div>

            <div className="task-cards-container">
                {
                    data.map(task => {

                        return isTaskToday(task, pickedDate, partOfDay) &&

                            <TaskCard
                                task={task}
                                key={task.id}
                            />
                    })
                }
            </div>

        </div>
    )
}

function isTaskToday(task: Routine, pickedDate: Date, partOfDay: string) {

    const taskDate: string = new Date(task.startingDate).toDateString();
    const pickedDateString: string = pickedDate.toDateString();

    return (taskDate === pickedDate.toDateString()
        && task.defaultTimeOfDay.includes(partOfDay))
}