import React, { useContext, useState } from 'react'
import { AppContext } from '../App';

import { ActionIcon } from '@mantine/core';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';


type Props = {}

export default function Footer() {

    const { setAddTaskModalOpen } = useContext(AppContext) as AppContext;

    return (
        <>
            <div className="footer-container">
                <ActionIcon
                    onClick={() => setAddTaskModalOpen(true)}
                >
                    <AddCircleIcon />
                </ActionIcon>

                <ActionIcon
                >
                    <GridViewIcon />
                </ActionIcon>

                <ActionIcon
                >
                    <SettingsIcon />
                </ActionIcon>
            </div>
        </>
    )
}