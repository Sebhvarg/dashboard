import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item';

interface TableWeatherProps {
  itemsIn: Item[];
}

export default function BasicTable({ itemsIn }: TableWeatherProps) {
  const hora = (date: string) => {
    const horas = date.split("T")[1].split(":");
    return `${horas[0]}:${horas[1]}`;
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hora Inicio</TableCell>
            <TableCell>Hora Fin</TableCell>
            <TableCell align="right">Precipitación</TableCell>
            <TableCell align="right">Humedad</TableCell>
            <TableCell align="right">Nubosidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemsIn.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{hora(item.dateStart)}</TableCell>
              <TableCell>{hora(item.dateEnd)}</TableCell>
              <TableCell align="right">{item.precipitation}%</TableCell>
              <TableCell align="right">{item.humidity}%</TableCell>
              <TableCell align="right">{item.clouds}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
