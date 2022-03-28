import React, { useState } from 'react'
import { ActionIcon } from '@mantine/core';

import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';

import { Modal } from '@mantine/core';
import AddRoutineView from './AddRoutineView';

type Props = {}

export default function Footer() {

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <div className="footer-container">
                <ActionIcon
                    onClick={() => setModalOpen(true)}
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

            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Add new routine"
            >
                <AddRoutineView
                    closeModal={() => setModalOpen(false)}
                />
            </Modal>
        </>

    )
}