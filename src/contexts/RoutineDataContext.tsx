import React, { createContext, ReactChildren, ReactNode, useContext } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid"

export type RoutineContext = {
    data: Routine[],
    setData?: (data: Routine[]) => void,

    addRoutine: (routine: Routine) => void,
    deleteRoutine?: (id: string) => void,
    getNewRoutine: () => Routine,
}

const RoutineContext = createContext<RoutineContext>({
    data: [],
    getNewRoutine: () => getNewRoutine(),
    addRoutine: () => null,
});

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

    function deleteRoutine(id: string) {
        setData((prevData: Routine[]) => {
            return prevData.filter(inquiry => inquiry.id !== id);
        });
    }


    return (
        <RoutineContext.Provider
            value={{
                data,
                setData,

                addRoutine,
                deleteRoutine,
                getNewRoutine,
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

    console.log("got to here, routine: ");
    console.log(newRoutine);



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