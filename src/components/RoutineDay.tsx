
import React from 'react'
import PartOfDay from './PartOfDay'

type Props = {}

export default function RoutineDay({ }: Props) {
    return (
        <div className="day-container">
            <PartOfDay
                partOfDay='Morning'
                endTime='12:00'
                tasks={["go there"]} />
            <PartOfDay
                tasks={["go there"]}
                endTime='16:00'
                partOfDay='Afternoon' />
            <PartOfDay
                tasks={["go there"]}
                endTime='21:00'
                partOfDay='Evening' />
        </div>
    )
}