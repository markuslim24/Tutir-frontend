import React from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Video 1", 159, 6.0, 24, 4.0),
  createData("Video 2", 237, 9.0, 37, 4.3),
  createData("Video 3", 262, 16.0, 24, 6.0),
  createData("Video 4", 305, 3.7, 67, 4.3),
  createData("Video 5", 356, 16.0, 49, 3.9),
];

export default function VideoTable() {
  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography variant="h6">Videos</Typography>
        </Toolbar>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Video</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Views</TableCell>
              <TableCell align="right">Comments</TableCell>
              <TableCell align="right">Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
