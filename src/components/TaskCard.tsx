
import React, { useContext, useRef, useState } from 'react'
import LaundryIcon from '@mui/icons-material/LocalLaundryService';
import useLongPress from '../hooks/useLongPress';
import { AppContext } from '../App';
import { Routine } from '../contexts/RoutineDataContext';

type Props = {
    task: Routine
}

const colors = [
    "rgb(164, 219, 179)",
    "rgb(164, 188, 219)",
    "rgb(196, 164, 219)",
    "rgb(219, 164, 186)",
    "rgb(219, 197, 164)",
    "rgb(194, 219, 164)",
]

export default function TaskCard({ task }: Props) {

    const [cardOn, setCardOn] = useState(Math.random() > .5);
    const bgColorRef = useRef(colors[Math.floor(Math.random() * colors.length)]);

    const {
        setAddTaskModalOpen,
        setSelectedTaskId } = useContext(AppContext) as AppContext;

    const onLongPress = () => {
        setSelectedTaskId(task.id);
        setAddTaskModalOpen(true);
    };

    const onClick = () => {
        setCardOn(prevState => !prevState)
    }

    const longPressEvent = useLongPress(onLongPress, onClick);

    const cardClasses = "task-card-container" + (
        cardOn ? "" : " faded-card"
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
                {task.name}
            </div>
        </div>
    )
}