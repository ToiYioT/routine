
import React from 'react'
import useRoutineData, { Routine } from '../contexts/RoutineDataContext'
import TaskCard from './TaskCard'

type Props = {
    partOfDay: string
    endTime: string
}

export default function PartOfDay({ partOfDay, endTime }: Props) {

    const { data } = useRoutineData();

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

                        if (task.defaultTimeOfDay.includes(partOfDay)) {
                            return <TaskCard
                                taskName={task.name}
                                key={task.id}
                            />
                        }
                    })
                }
            </div>

        </div>
    )
}