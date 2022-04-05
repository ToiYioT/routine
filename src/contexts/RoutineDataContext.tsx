import React, { createContext, ReactChildren, ReactNode, useContext } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid"

export type RoutineContext = {
    data: Routine[],
    setData?: (data: Routine[]) => void,

    addRoutine: (routine: Routine) => void,
    updateRoutine: (routine: Routine) => void,
    deleteRoutine: (id: string) => void,
    getNewRoutine: () => Routine,
    getRoutine: (id: string) => Routine | null
}

const RoutineContext = createContext<RoutineContext | null>(null);

interface Props {
    children: ReactNode,
}

export default function useRoutineData() {
    return useContext(RoutineContext);
}

export function RoutineProvider({ children }: Props) {

    const [data, setData] = useLocalStorage("routine-data", []);

    function addRoutine(routine: Routine) {
        const newRoutine = routine;
        setData((prevData: Routine[]) => {
            return [...prevData, newRoutine];
        });
    }

    function updateRoutine(routineToUpdate: Routine) {

        setData((prevData: Routine[]) => {
            return prevData.map(routine => {
                if (routine.id === routineToUpdate.id) return routineToUpdate;
                return routine
            })
        });
    }

    function deleteRoutine(id: string) {
        setData((prevData: Routine[]) => {
            return prevData.filter(inquiry => inquiry.id !== id);
        });
    }

    function getRoutine(id: string) {
        return data.find((task: Routine) => task.id == id);
    }


    return (
        <RoutineContext.Provider
            value={{
                data,
                setData,

                addRoutine,
                updateRoutine,
                deleteRoutine,
                getNewRoutine,
                getRoutine,
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
        stickyTask: false,
        dismissed: false
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
    stickyTask: boolean
    dismissed: boolean
    taksInstances?: TaksInstance[]
}

type TaksInstance = {
    id: string,
    date: Date,
    timeOfDay: string
}