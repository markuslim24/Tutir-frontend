import React, { useState, useEffect } from "react";

import { client } from "../util/util";
import axios from "axios";

import { Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import UploadVideoDialog from "./UploadVideoDialog";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },

  uploadVideoButton: {
    margin: "0px 25px",
  },
});

function createData(
  videoName: string,
  date: string,
  views: number,
  comments: number,
  likes: number
) {
  return { videoName, date, views, comments, likes };
}

const rows = [
  createData("Video 1", "15/6/2021", 6.0, 24, 4.0),
  createData("Video 2", "15/6/2021", 9.0, 37, 4.3),
  createData("Video 3", "15/6/2021", 16.0, 24, 6.0),
  createData("Video 4", "15/6/2021", 3.7, 67, 4.3),
  createData("Video 5", "15/6/2021", 16.0, 49, 3.9),
];

export default function VideoTable({ user }) {
  const [tableData, setTableData] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    getTableData();
  }, [tableData]);

  async function getTableData() {
    try {
      let res = await client.get(`/video?owner=${user.id}`);
      const videos = res.data.payload;
      setTableData([...videos]);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let code = err.response?.data.code;
        // if (code === "invalid_params") {
        //   return handleAlerts("invalid params!");
        // } else if (code === "auth_login_failed") {
        //   return handleAlerts("Incorrect username/password!");
        // }
      }
      throw err;
    }
  }

  const handleUploadOpen = () => {
    setOpenForm(true);
  };

  const handleUploadClose = () => {
    setOpenForm(false);
  };

  const classes = useStyles();

  return (
    <>
      <TableContainer component={Paper}>
        <Toolbar>
          <Typography variant="h6">Videos</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadOpen}
            className={classes.uploadVideoButton}
          >
            Upload Video
          </Button>
          <UploadVideoDialog
            openForm={openForm}
            handleUploadClose={handleUploadClose}
          />
        </Toolbar>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Video Title</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Views</TableCell>
              <TableCell align="right">Comments</TableCell>
              <TableCell align="right">Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((data) => (
              <TableRow key={data.id}>
                <TableCell component="th" scope="row">
                  {data.title}
                </TableCell>
                <TableCell align="right">{/*row.date*/}</TableCell>
                <TableCell align="right">{/*row.views*/}</TableCell>
                <TableCell align="right">{/*row.comments*/}</TableCell>
                <TableCell align="right">{/*row.likes*/}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
