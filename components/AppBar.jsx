import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Box
} from '@mui/material';
import {
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const CustomAppBar = ({ darkMode, onDarkModeToggle }) => {
    const { push } = useRouter();

    const handleHomeClick = () => {
        push('/getall');
    };

    const handleGetTodayClick = () => {
        push('/gettoday');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} /> {/* This box will push the buttons to the right */}
                <Button color="inherit" onClick={handleHomeClick}>
                    <strong>Home</strong>
                </Button>
                <Button color="inherit" onClick={handleGetTodayClick}>
                    <strong>Get Today</strong>
                </Button>
                <IconButton onClick={onDarkModeToggle} color="inherit">
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;