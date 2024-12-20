import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item';
import { Typography } from '@mui/material';

interface MyProp {
  itemsIn: Item[];
}

export default function TableWeather(props: MyProp) {
  const [rows, setRows] = useState<Item[]>([]);

  useEffect(() => {
    setRows(props.itemsIn);
  }, [props.itemsIn]);



  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%', // Ajustar al 100% del contenedor
        margin: '5px',
        borderRadius: '5px',
        height: 'auto',
      }}
    >
      <Typography component="h2" variant="h6"
        color="black" sx={{ fontFamily: 'Helvetica', fontSize: '16px', fontWeight: 'Bold', flex: 1 }} gutterBottom>Precipitaciones próximas en horas</Typography>
      <TableContainer
        component={Paper}
        sx={{
          width: '100%', // Ocupa todo el ancho del Paper
          overflow: 'auto', // Habilita scroll si el contenido excede la altura
          borderRadius: '5px',
        }}
      >
        <Table sx={{ border: '1px solid #0570B0', widt: '60%' }} >
          <TableHead>
            <TableRow sx={{ backgroundColor: '#0570B0' }}>
              <TableCell align="left" sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderBottom: '1px solid white',
              }} >Hora de inicio</TableCell>
              <TableCell align="left" sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderBottom: '1px solid white',
              }}>Hora de fin</TableCell>
              <TableCell align="right" sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                borderBottom: '1px solid white',
              }}>Precipitación (%)</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell component="th" scope="row">
                  {row.dateStart}
                </TableCell>
                <TableCell align="left">{row.dateEnd}</TableCell>
                <TableCell align="right">{row.precipitation} %</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}