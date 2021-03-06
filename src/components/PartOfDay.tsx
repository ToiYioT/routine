import React, { useContext } from 'react'
import { AppContext } from '../App'
import useRoutineData, { Routine, RoutineContext } from '../contexts/RoutineDataContext'
import TaskCard from './TaskCard'
import { Temporal } from '@js-temporal/polyfill'

type Props = {
    partOfDay: string
    endTime: string
}

export default function PartOfDay({ partOfDay, endTime }: Props) {

    const { routineData, toggleDoneTask, findTask } = useRoutineData() as RoutineContext;
    const { pickedDate } = useContext(AppContext) as AppContext;

    const pickedDateTemporal = getTemporalFromDate(pickedDate);

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
                    routineData.map(task => {

                        const doneTaskObject = {
                            routineId: task.id,
                            date: pickedDate,
                            timeOfDay: partOfDay
                        }

                        if (isTaskToday(task, pickedDateTemporal, partOfDay)) {

                            return <TaskCard
                                routine={task}
                                dismissed={findTask(doneTaskObject) != null}
                                toggleDoneTask={() => toggleDoneTask(doneTaskObject)}
                                key={task.id}
                            />

                        }
                    })
                }
            </div>

        </div>
    )
}

function isTaskToday(
    task: Routine,
    pickedDate: Temporal.PlainDate,
    partOfDay: string
): boolean {

    const taskDate = getTemporalFromDate(new Date(task.startingDate));
    const daysFromStart: number = pickedDate.since(taskDate).days;

    // console.log("picked date: " + pickedDate.toString());
    // console.log("task date: " + taskDate.toString());
    // console.log("days from start: " + daysFromStart);

    return (
        daysFromStart >= 0 &&
        daysFromStart % task.frequency == 0 &&
        task.defaultTimeOfDay.includes(partOfDay)
    )
}

function getTemporalFromDate(date: Date): Temporal.PlainDate {
    return new Temporal.PlainDate(
        date.getFullYear(), date.getMonth() + 1, date.getDate()
    )
}