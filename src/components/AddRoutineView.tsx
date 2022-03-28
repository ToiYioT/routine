import React, { useRef, useState } from 'react'

import {
    TextInput, MultiSelect,
    Checkbox, Button, NumberInput
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { Calendar } from 'tabler-icons-react';
import useRoutineData from '../contexts/RoutineDataContext';


type Props = {
    closeModal: () => void
}

const sectionOfDayData = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
];

export default function AddRoutineView({ closeModal }: Props) {

    const { addRoutine, getNewRoutine } = useRoutineData();
    const nameInputRef = useRef<HTMLInputElement>(null);

    const [multiInputValue, setMultiInputValue] = useState<string[]>(["morning"]);


    function handleSubmit() {

        const newRoutine = getNewRoutine();
        console.log("multi input value: " + multiInputValue);
        console.log(multiInputValue);



        newRoutine.name = nameInputRef.current?.value || "no name";

        if (multiInputValue.length > 0) {
            console.log("changed the time of day value");

            newRoutine.defaultTimeOfDay = multiInputValue;
        }

        addRoutine(newRoutine);
        closeModal();
    }


    return (
        <div className="routine-view-items">

            <TextInput
                placeholder="task"
                label="Task Name"
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