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

export default function VideoTable(props) {
  const [tableData, setTableData] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    if (props.user) {
      getTableData();
    }
  }, [props.user]);

  async function getTableData() {
    try {
      let res = await client.get(`/video?owner=${props.user.id}`);
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
            getTableData={getTableData}
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
