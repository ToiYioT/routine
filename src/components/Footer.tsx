import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import GridViewIcon from '@mui/icons-material/GridView';
import SettingsIcon from '@mui/icons-material/Settings';

type Props = {}

export default function Footer({ }: Props) {
    return (
        <div className="footer-container">
            <AddCircleIcon />
            <GridViewIcon />
            <SettingsIcon />
        </div>

    )
}