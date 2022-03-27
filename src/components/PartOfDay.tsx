
import React from 'react'
import TaskCard from './TaskCard'

type Props = {
    partOfDay: string
    tasks: string[]
    endTime: string
}

export default function PartOfDay({ partOfDay, tasks, endTime }: Props) {
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
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
            </div>

        </div>
    )
}