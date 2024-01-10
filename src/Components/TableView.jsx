import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

function createData(name, description, taskCount) {
  return { name, description, taskCount };
}

export default function BasicTable() {
  const unformattedRows = useSelector((state) => state.groups);
  const formattedRows = unformattedRows.map((row) => {
    return createData(row.name, row.description, row.tasks.length)
  })

  console.log(formattedRows)

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Groups</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Tasks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formattedRows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.taskCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
