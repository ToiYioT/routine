
import React, { createRef, useEffect, useRef, useState } from 'react'
import LaundryIcon from '@mui/icons-material/LocalLaundryService';

type Props = {
    taskName: string
}

const colors = [
    "rgb(164, 219, 179)",
    "rgb(164, 188, 219)",
    "rgb(196, 164, 219)",
    "rgb(219, 164, 186)",
    "rgb(219, 197, 164)",
    "rgb(194, 219, 164)",
]

export default function TaskCard({ taskName }: Props) {

    const [cardOn, setCardOn] = useState(Math.random() > .5);
    const bgColorRef = useRef(colors[Math.floor(Math.random() * colors.length)]);

    const cardClasses = "task-card-container" + (
        cardOn ? "" : " faded-card"
    );

    return (
        <div
            className={cardClasses}
            onClick={() => setCardOn(prevState => !prevState)}
        >
            <div
                className="task-card-image-section"
                style={{ backgroundColor: bgColorRef.current }}>

                <LaundryIcon
                    sx={{ fontSize: "48px" }}
                />
            </div>
            <div className="task-card-description">
                {taskName}
            </div>
        </div>
    )
}