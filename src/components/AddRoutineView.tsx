import React, { useContext, useEffect, useRef, useState } from 'react'
import { Modal } from '@mantine/core';

import {
    TextInput, MultiSelect,
    Checkbox, Button, NumberInput
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { Calendar } from 'tabler-icons-react';
import useRoutineData, { RoutineContext } from '../contexts/RoutineDataContext';
import { AppContext } from '../App';


type Props = {
    addroutineModalOpen: boolean
    setAddroutineModalOpen: (open: boolean) => void
}

const sectionOfDayData = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
];

export default function AddRoutineView(props: Props) {

    const {
        addroutineModalOpen,
        setAddroutineModalOpen,
    } = props;

    const { addRoutine, updateRoutine,
        getRoutine, getNewRoutine } = useRoutineData() as RoutineContext;
    const { selectedTaskId, setSelectedTaskId } = useContext(AppContext) as AppContext;
    const selectedRoutine = selectedTaskId ? getRoutine(selectedTaskId) : null;
    const nameInputRef = useRef<HTMLInputElement>(null);

    const [multiInputValue, setMultiInputValue] = useState<string[]>(["morning"]);
    const [frequencyValue, setFrequencyValue] = useState<number>(7);
    const [isStickyTask, setIsStickyTask] = useState<boolean>(false);
    const [startingDate, setStartingDate] = useState<Date>(new Date());

    useEffect(() => {
        if (selectedRoutine) {
            // set the values from data
            setMultiInputValue(selectedRoutine.defaultTimeOfDay);
            setFrequencyValue(selectedRoutine.frequency);
            setIsStickyTask(selectedRoutine.stickyTask);
            setStartingDate(new Date(selectedRoutine.startingDate));

        } else {
            // defaults:
            setMultiInputValue(["morning"]);
            setFrequencyValue(7);
            setIsStickyTask(false);
            setStartingDate(new Date());
        }
    }, [selectedRoutine]);

    function handleSubmit() {

        const newRoutine = selectedRoutine ? selectedRoutine : getNewRoutine();
        newRoutine.name = nameInputRef.current?.value || "no name";

        if (multiInputValue.length > 0) {
            newRoutine.defaultTimeOfDay = multiInputValue;
        }
        newRoutine.frequency = frequencyValue;
        newRoutine.stickyTask = isStickyTask;
        newRoutine.startingDate = startingDate;
        console.log("saving the date:");
        console.log(startingDate);



        selectedRoutine ? updateRoutine(newRoutine)
            : addRoutine(newRoutine);

        setSelectedTaskId(null);
        handleCloseModal();
    }

    function handleCloseModal() {
        setAddroutineModalOpen(false);
        setSelectedTaskId(null);
    }

    return (
        <Modal
            opened={addroutineModalOpen}
            onClose={handleCloseModal}
            title={selectedRoutine ? "Update " + selectedRoutine.name
                : "Add new routine"}
        >

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

                    defaultValue={startingDate}
                    value={startingDate}
                    onChange={(e: Date) => {
                        console.log("on change date:");
                        console.log(e);

                        setStartingDate(e)
                    }}
                    icon={<Calendar size={16} />}
                />

                <NumberInput
                    label="Repeat task every x days"
                    value={frequencyValue}
                    onChange={(value: number) => setFrequencyValue(value)}
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
                    checked={isStickyTask}
                    onChange={(event) => setIsStickyTask(event.currentTarget.checked)}
                />


                <Button
                    className='add-routine-submit-btn'
                    onClick={handleSubmit}
                    color="lime">
                    {selectedRoutine ? "Update" : "Submit"}
                </Button>

                {// optional delete button
                    selectedRoutine &&
                    <Button
                        className='add-routine-delete-btn'
                        color="red">
                        Delete (long press)
                    </Button>}
            </div>

        </Modal>

    )
}