
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

interface Config {
  rows: Array<object>;
}


export default function BasicTable(data: Config) {

  {/*   
         4. Declare la variable de estado (rows) y la función de actualización (setRows).
         Use el mismo identificador de la variable con valores fijos (rows)
     */}

     let [rows, setRows] = useState([])
		
     {/* 
         5. Agregue el hook useEffect, controlado por el prop del componente (data), y
         Dentro del hook, invoque al métdo de actualización con el valor del prop (data.rows).
     */}

     useEffect( () => {

         (()=> {

             setRows(data.rows)

         })()

     }, [data] )


     {/* JSX */}

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Hora</TableCell>
            <TableCell align="center">UV</TableCell>
            <TableCell align="center">Velocidad del viento</TableCell>
            <TableCell align="center">Temperatura_2m</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.rangeHours}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="center">{row.uv}</TableCell>
              <TableCell align="center">{row.windSpeed}</TableCell>
              <TableCell align="center">{row.temperature}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
