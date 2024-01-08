import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Brightness4Icon,
    Brightness7Icon
} from '@mui/icons-material';
import {
    createTheme,
    ThemeProvider,
    useMediaQuery,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Grid,
    Box
} from '@mui/material';

const GetAll = () => {
    const [data, setData] = useState([]);
    const { push } = useRouter();

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

    return (
        <div>
            <h1>Data from API</h1>
            <Box display="flex" justifyContent="flex-end" marginTop={2}>
                {/* Additional buttons can be added here */}
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
        </div>
    );
};

export default GetAll;
