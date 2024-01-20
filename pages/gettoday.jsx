import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    createTheme,
    ThemeProvider,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    useMediaQuery,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CustomAppBar from '../components/AppBar';

const GetAll = () => {
    const [data, setData] = useState([]);
    const { push } = useRouter();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = useState(prefersDarkMode);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/gettoday');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleRedirect = () => {
        push('/insert');
    };

    const calculateTotalAmount = () => {
        return data.reduce((total, item) =>
            total + (parseFloat(item.amount) || 0), 0)
            .toFixed(2);
    };

    const darkTheme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <CustomAppBar
                darkMode={darkMode}
                onDarkModeToggle={() => setDarkMode(!darkMode)}
            />
            <main style={{ padding: '20px', paddingRight: '20px' }}>
                <h1>Today Data</h1>
                <Box display="flex" justifyContent="flex-end" marginTop={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        margin="normal"
                        onClick={handleRedirect}>
                        Create
                    </Button>
                </Box>
                <br />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Channel</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.date}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.amount}</TableCell>
                                    <TableCell>{item.channel}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <strong>Total:</strong> {calculateTotalAmount()}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </main>
        </ThemeProvider>
    );
};

export default GetAll;
