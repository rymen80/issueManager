import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontSize: '20px',
  }
});

function createData(title, project, status, edit) {
  return { title, project, status, edit };
}

const rows = [
  createData('title1', 'project1', 'new'),
  createData('title2', 'project2', 'new'),
  createData('title3', 'project1', 'done'),
  createData('title4', 'project2', 'in progress'),
  createData('title5', 'project3', 'done'),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell className={classes.header}>Issue</TableCell>
            <TableCell className={classes.header} align="right">Project</TableCell>
            <TableCell className={classes.header} align="right">Status</TableCell>
            <TableCell className={classes.header} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.project}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right"><button><EditIcon/></button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}