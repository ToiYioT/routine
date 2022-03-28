
import React from 'react'
import PartOfDay from './PartOfDay'

type Props = {}

export default function RoutineDay({ }: Props) {


    return (
        <div className="day-container">
            <PartOfDay
                partOfDay='morning'
                endTime='12:00'
            />
            <PartOfDay
                endTime='16:00'
                partOfDay='afternoon' />
            <PartOfDay
                endTime='21:00'
                partOfDay='evening' />
        </div>
    )
}