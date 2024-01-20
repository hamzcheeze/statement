import React from 'react';
import {
    AppBar,
    Toolbar,
    Button,
    Box
} from '@mui/material';
import { useRouter } from 'next/router';

const CustomAppBar = () => {
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
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;