import React, { createContext, ReactChildren, ReactNode, useContext } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid"

export type RoutineContext = {
    data: Routine[],
    setData?: (data: Routine[]) => void,

    addRoutine: (routine: Routine) => void,
    updateRoutine: (routine: Routine) => void,
    deleteRoutine?: (id: string) => void,
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
    const newRoutine: Routine = {
        id: uuidv4(),
        name: "",
        icon: 0,

        startingDate: "",
        frequency: "",
        defaultTimeOfDay: ["morning"],
        nextTime: "",
        stickyTask: false,
        dismissed: false,
    };

    return newRoutine;
}


export type Routine = {
    id: string,
    name: string,
    icon: number

    startingDate?: string
    frequency?: string
    defaultTimeOfDay: string[]
    nextTime?: string
    stickyTask?: boolean
    dismissed?: boolean

    taksInstances?: TaksInstance[]
}

type TaksInstance = {

}