
import { stringify } from 'querystring';
import React from 'react'

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
type Props = {}

export default function Header({ }: Props) {

    const date = new Date();


    return (
        <>
            <div className="time-and-date-container">
                <div className="date-container">
                    {weekday[date.getDay()]}, {monthNames[date.getMonth()]}
                    {" " + date.getDate()}
                </div>

                <div className="time-container">
                    {date.getHours()}:{date.getMinutes()}
                </div>

            </div>
            <div className="header-container">
                Routine
            </div>
        </>
    )
}