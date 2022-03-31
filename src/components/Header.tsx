import React, { useState } from 'react'

import { DatePicker } from '@mantine/dates';

type Props = {
    pickedDate: Date,
    setPickedDate: (date: Date) => void
}

export default function Header(props: Props) {

    const { pickedDate, setPickedDate } = props;


    return (
        <>
            <div className="time-and-date-container">
                <DatePicker
                    placeholder="Pick date"
                    firstDayOfWeek="sunday"
                    dropdownType='modal'
                    clearable={false}

                    value={pickedDate}
                    onChange={(newDate: Date) => setPickedDate(newDate)}
                    inputFormat="dddd,  MMMM D  YYYY"
                    styles={{
                        input: {
                            backgroundColor: "transparent",
                            fontFamily: "Oswald",
                            fontWeight: "Bold",
                            textTransform: "uppercase",
                        }
                    }}
                />

            </div>

            <div className="header-container">
                Routine
            </div>
        </>
    )
}