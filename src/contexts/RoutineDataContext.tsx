import React, { createContext, ReactChildren, ReactNode, useContext } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid"

export type RoutineContext = {
    routineData: Routine[]
    setRoutineData?: (data: Routine[]) => void

    addRoutine: (routine: Routine) => void
    updateRoutine: (routine: Routine) => void
    deleteRoutine: (id: string) => void
    getNewRoutine: () => Routine
    getRoutine: (id: string) => Routine | null

    findTask: (task: DoneTask) => DoneTask | null
    toggleDoneTask: (task: DoneTask) => void
}

const RoutineContext = createContext<RoutineContext | null>(null);

interface Props {
    children: ReactNode,
}

export default function useRoutineData() {
    return useContext(RoutineContext);
}

export function RoutineProvider({ children }: Props) {

    const [routineData, setRoutineData] = useLocalStorage("routine-data", []);
    const [doneTasksData, setDoneTasksData] = useLocalStorage("done-tasks-data", []);

    function addDoneTask(doneTask: DoneTask) {
        const newDoneTasksData = [...doneTasksData, doneTask];
        setDoneTasksData(newDoneTasksData);
    }

    function removeDoneTask(taskToRemove: DoneTask) {
        setDoneTasksData((prevData: DoneTask[]) => {

            return prevData.filter(doneTask => {
                return doneTask.routineId !== taskToRemove.routineId ||
                    doneTask.date !== taskToRemove.date ||
                    doneTask.timeOfDay !== taskToRemove.timeOfDay

            });
        })
    }

    function findTask(doneTask: DoneTask) {

        return doneTasksData.find((task: DoneTask) => {

            return new Date(task.date).toDateString() == doneTask.date.toDateString() &&
                task.routineId == doneTask.routineId &&
                task.timeOfDay == doneTask.timeOfDay
        });
    }

    function toggleDoneTask(toggleTask: DoneTask) {

        const foundTask = findTask(toggleTask);
        if (foundTask) {
            console.log("going to remove");

            removeDoneTask(foundTask);
        } else {
            console.log("going to add");
            addDoneTask(toggleTask);
        }
    }

    function addRoutine(routine: Routine) {
        const newRoutine = routine;
        setRoutineData((prevData: Routine[]) => {
            return [...prevData, newRoutine];
        });
    }

    function updateRoutine(routineToUpdate: Routine) {

        setRoutineData((prevData: Routine[]) => {
            return prevData.map(routine => {
                if (routine.id === routineToUpdate.id) return routineToUpdate;
                return routine
            })
        });
    }

    function deleteRoutine(id: string) {
        setRoutineData((prevData: Routine[]) => {
            return prevData.filter(routine => routine.id !== id);
        });
        setDoneTasksData((prevData: DoneTask[]) => {
            return prevData.filter(doneTask => doneTask.routineId != id);
        });
    }

    function getRoutine(id: string) {
        return routineData.find((task: Routine) => task.id == id);
    }


    return (
        <RoutineContext.Provider
            value={{
                routineData,
                setRoutineData,

                addRoutine,
                updateRoutine,
                deleteRoutine,
                getNewRoutine,
                getRoutine,

                findTask,
                toggleDoneTask
            }}
        >
            {children}
        </RoutineContext.Provider>
    )
}



//////////////////
///// DATA ///////
//////////////////

function getNewRoutine() {
    const dateNow = new Date();

    const newRoutine: Routine = {
        id: uuidv4(),
        name: "",
        icon: 0,

        startingDate: dateNow,
        frequency: 7,
        defaultTimeOfDay: ["morning"],
        nextTime: dateNow,
        postponable: true,
    };

    return newRoutine;
}


export type Routine = {
    id: string,
    name: string,
    icon: number

    startingDate: Date
    frequency: number
    defaultTimeOfDay: string[]
    nextTime: Date
    postponable: boolean
}

export type DoneTask = {
    routineId: string,
    date: Date,
    timeOfDay: string
}