import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createTheme,
  ThemeProvider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import CustomAppBar from '../components/AppBar';

const GetAll = () => {
  const [data, setData] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getall');
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
        <h1>All Data</h1>
        <Box display="flex" justifyContent="flex-end" marginTop={2}>
          &nbsp;
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
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </ThemeProvider>
  );
};

export default GetAll;
