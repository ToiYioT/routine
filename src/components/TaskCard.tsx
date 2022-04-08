
import React, { useContext, useRef } from 'react'
import LaundryIcon from '@mui/icons-material/LocalLaundryService';
import useLongPress from '../hooks/useLongPress';
import { AppContext } from '../App';
import { Routine } from '../contexts/RoutineDataContext';
import { useNavigate } from "react-router-dom";

type Props = {
    routine: Routine
    dismissed: boolean
    toggleDoneTask: () => void
}

const colors = [
    "rgb(164, 219, 179)",
    "rgb(164, 188, 219)",
    "rgb(196, 164, 219)",
    "rgb(219, 164, 186)",
    "rgb(219, 197, 164)",
    "rgb(194, 219, 164)",
]

export default function TaskCard({ routine, dismissed, toggleDoneTask }: Props) {

    const navigate = useNavigate();
    const bgColorRef = useRef(colors[Math.floor(Math.random() * colors.length)]);

    const {
        setAddroutineModalOpen,
        setSelectedTaskId } = useContext(AppContext) as AppContext;


    const onLongPress = () => {

        setSelectedTaskId(routine.id);
        setAddroutineModalOpen(true);
        navigate("/add-routine");
    };

    const onClick = () => {
        toggleDoneTask();
    }

    const longPressEvent = useLongPress(onLongPress, onClick);

    const cardClasses = "task-card-container" + (
        dismissed === false ? "" : " faded-card"
    );

    return (
        <div
            className={cardClasses}
            {...longPressEvent}
        >
            <div
                className="task-card-image-section"
                style={{ backgroundColor: bgColorRef.current }}>

                <LaundryIcon
                    sx={{ fontSize: "48px" }}
                />
            </div>
            <div className="task-card-description">
                {routine.name}
            </div>
        </div>
    )
}