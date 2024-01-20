import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    createTheme,
    ThemeProvider,
    Button,
    TextField,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    MenuItem
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CustomAppBar from '../components/AppBar';

const InsertData = () => {
    const type = [
        {
            value: 'Food',
            label: 'Food',
        },
        {
            value: 'Transport',
            label: 'Transport',
        },
        {
            value: 'Utility',
            label: 'Utility',
        },
        {
            value: 'Book',
            label: 'Book',
        },
        {
            value: 'Medicine',
            label: 'Medicine',
        },
        {
            value: 'Costume',
            label: 'Costume',
        },
        {
            value: 'Subscription',
            label: 'Subscription',
        },
        {
            value: 'Gas',
            label: 'Gas',
        }
    ];

    const [formData, setFormData] = useState({
        date: '',
        name: '',
        type: '',
        amount: 0,
        channel: '',
    });
    const [tableData, setTableData] = useState([])
    const [response, setResponse] = useState('');
    const { push } = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCreate = (event) => {
        event.preventDefault();
        setTableData([...tableData, formData]);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/insert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tableData),
            });
            const result = await response.json();
            setResponse(result.message);
            if (result.status === true) {
                push('/getall')
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            setResponse('Error inserting data');
        }
    };

    const calculateTotalAmount = () => {
        return tableData.reduce((total, item) =>
            total + (parseFloat(item.amount) || 0), 0)
            .toFixed(2);
    };

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <CustomAppBar />
            <main style={{ padding: '20px', paddingRight: '20px' }}>
                <h1>Insert Data</h1>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Date"
                            type="date"
                            variant="outlined"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* <TextField
                        fullWidth
                        label="Type"
                        variant="outlined"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        margin="normal"
                    /> */}
                        <TextField
                            select
                            fullWidth
                            label="Type"
                            variant="outlined"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            margin="normal"
                            defaultValue="Food"
                        >
                            {type.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Amount"
                            type="number"
                            variant="outlined"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Channel"
                            variant="outlined"
                            name="channel"
                            value={formData.channel}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                </Grid>
                <Button onClick={handleCreate} variant="contained" color="primary" margin="normal">
                    Create
                </Button>
                {tableData.length > 0 && (
                    <div>
                        <Typography variant="h6" gutterBottom marginTop={2}>
                            Data Table
                        </Typography>
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
                                    {tableData.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>{item.amount}</TableCell>
                                            <TableCell>{item.channel}</TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell>
                                            <strong>Total:</strong> {calculateTotalAmount()}
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button onClick={handleSubmit} variant="contained" color="primary" margin="normal">
                            Submit
                        </Button>
                    </div>
                )}
                {response && (
                    <Typography variant="body1" color="textSecondary" marginTop={2}>
                        Response: {response}
                    </Typography>
                )}
            </main>
        </ThemeProvider>
    );
};

export default InsertData;
