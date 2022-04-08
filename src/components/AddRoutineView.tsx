import React, { useContext, useEffect, useState } from 'react'
import { Modal } from '@mantine/core';

import {
    TextInput, MultiSelect,
    Checkbox, Button, NumberInput
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import { Calendar } from 'tabler-icons-react';
import useRoutineData, { RoutineContext } from '../contexts/RoutineDataContext';
import { AppContext } from '../App';

import useLongPress from '../hooks/useLongPress';


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
        getRoutine, getNewRoutine, deleteRoutine } = useRoutineData() as RoutineContext;
    const { selectedTaskId, setSelectedTaskId,
        pickedDate } = useContext(AppContext) as AppContext;
    const selectedRoutine = selectedTaskId ? getRoutine(selectedTaskId) : null;

    const [routineName, setRoutineName] = useState<string>("");
    const [multiInputValue, setMultiInputValue] = useState<string[]>(["morning"]);
    const [frequencyValue, setFrequencyValue] = useState<number>(7);
    const [isStickyTask, setIsStickyTask] = useState<boolean>(false);
    const [startingDate, setStartingDate] = useState<Date>(pickedDate);


    const deleteButtonLongPressEvent = useLongPress(() => {

        if (selectedTaskId) {
            deleteRoutine(selectedTaskId);
            handleCloseModal();
        }

    }, () => null, { delay: 2000 });

    useEffect(() => {
        if (selectedRoutine) {
            // set the values from data
            setRoutineName(selectedRoutine.name);
            setMultiInputValue(selectedRoutine.defaultTimeOfDay);
            setFrequencyValue(selectedRoutine.frequency);
            setIsStickyTask(selectedRoutine.stickyTask);
            setStartingDate(new Date(selectedRoutine.startingDate));

        } else {
            // defaults:
            setRoutineName("");
            setMultiInputValue(["morning"]);
            setFrequencyValue(7);
            setIsStickyTask(false);
            setStartingDate(pickedDate);
        }
    }, [selectedRoutine, pickedDate]);


    function handleSubmit() {

        const newRoutine = selectedRoutine ? selectedRoutine : getNewRoutine();
        newRoutine.name = routineName;

        if (multiInputValue.length > 0) {
            newRoutine.defaultTimeOfDay = multiInputValue;
        }
        if (startingDate) {
            newRoutine.startingDate = startingDate;
            newRoutine.nextTime = startingDate;
        }
        newRoutine.frequency = frequencyValue;
        newRoutine.stickyTask = isStickyTask;

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
                    value={routineName}
                    onChange={event => setRoutineName(event.currentTarget.value)}
                />

                <DatePicker
                    label="Starting Date"
                    placeholder="Pick date"
                    firstDayOfWeek="sunday"

                    inputFormat="dddd,  MMMM D  YYYY"
                    defaultValue={startingDate}
                    value={startingDate}
                    onChange={(e: Date) => setStartingDate(e)}
                    clearable={false}
                    icon={<Calendar size={16} />}
                />

                <NumberInput
                    label="Repeat task every x days"
                    value={frequencyValue}
                    onChange={(value: number) => setFrequencyValue(value)}
                    min={1}
                    max={500}
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
                        {...deleteButtonLongPressEvent}
                        className='add-routine-delete-btn'
                        color="red">
                        Delete (long press)
                    </Button>}
            </div>

        </Modal>

    )
}