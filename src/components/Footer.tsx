import React, { useContext, useState } from 'react'
import { AppContext } from '../App';

import { ActionIcon } from '@mantine/core';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';

import { Link } from "react-router-dom";

type Props = {}

export default function Footer() {

    const { setAddroutineModalOpen } = useContext(AppContext) as AppContext;

    return (
        <>
            <div className="footer-container">
                <Link to="/add-routine">
                    <ActionIcon
                        onClick={() => setAddroutineModalOpen(true)}
                    >
                        <AddCircleIcon />
                    </ActionIcon>
                </Link>

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