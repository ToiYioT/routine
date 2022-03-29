import React, { useContext, useRef, useState } from 'react'

import {
    TextInput, MultiSelect,
    Checkbox, Button, NumberInput
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { Calendar } from 'tabler-icons-react';
import useRoutineData, { RoutineContext } from '../contexts/RoutineDataContext';
import { AppContext } from '../App';


type Props = {
    closeModal: () => void
}

const sectionOfDayData = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
];

export default function AddRoutineView({ closeModal }: Props) {

    const { addRoutine, updateRoutine,
        getRoutine, getNewRoutine } = useRoutineData() as RoutineContext;
    const { selectedTaskId, setSelectedTaskId } = useContext(AppContext) as AppContext;
    const selectedRoutine = selectedTaskId ? getRoutine(selectedTaskId) : null;

    const nameInputRef = useRef<HTMLInputElement>(null);
    const [multiInputValue, setMultiInputValue] = useState<string[]>(
        selectedRoutine ? selectedRoutine.defaultTimeOfDay : ["morning"]
    );



    function handleSubmit() {

        const newRoutine = selectedRoutine ? selectedRoutine : getNewRoutine();
        newRoutine.name = nameInputRef.current?.value || "no name";

        if (multiInputValue.length > 0) {
            newRoutine.defaultTimeOfDay = multiInputValue;
        }

        selectedRoutine ? updateRoutine(newRoutine) : addRoutine(newRoutine);
        setSelectedTaskId(null);
        closeModal();
    }


    return (
        <div className="routine-view-items">

            <TextInput
                placeholder="task"
                label="Task Name"
                defaultValue={selectedRoutine ? selectedRoutine.name : ""}
                ref={nameInputRef}
            />

            <DatePicker
                label="Starting Date"
                placeholder="Pick date"
                firstDayOfWeek="sunday"
                defaultValue={new Date()}
                icon={<Calendar size={16} />}
            />

            <NumberInput
                label="Repeat task every x days"
                defaultValue={7}
            />

            <MultiSelect
                data={sectionOfDayData}
                label="Time of day"
                value={multiInputValue}
                onChange={setMultiInputValue}
            />

            <Checkbox
                label="Should carry over when ignored"
                color="lime"
            />

            <Button
                className='add-routine-submit-btn'
                onClick={handleSubmit}
                color="lime">
                Submit
            </Button>
        </div>
    )
}