import React, { useState, useEffect } from "react";
import { client } from "../util/util";
import axios from "axios";
import VideoPreview from "./VideoPreview";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      margin: "0 auto",
      backgroundColor: theme.palette.background.paper,
    },
    gridContainer: {
      display: "grid",
      width: "95%",
      margin: "0 auto",
      gridTemplateColumns: "repeat(3,1fr)",
      gridGap: "1em",
      [theme.breakpoints.down("xs")]: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "[row1-start] 50px [row1-end]",
        //gridAutoRows: "350px",
      },
      [theme.breakpoints.only("sm")]: {
        gridTemplateColumns: "repeat(2,1fr)",
        gridTemplateRows: "[row1-start] 50px [row1-end]",
        //gridAutoRows: "300px",
      },
      [theme.breakpoints.only("md")]: {
        gridTemplateColumns: "repeat(3,1fr)",
        gridTemplateRows: "[row1-start] 50px [row1-end]",
        //gridAutoRows: "250px",
      },
      [theme.breakpoints.only("lg")]: {
        gridTemplateColumns: "repeat(4,1fr)",
        gridTemplateRows: "[row1-start] 50px [row1-end]",
        // gridAutoRows: "230px",
      },
      [theme.breakpoints.up("xl")]: {
        gridTemplateColumns: "repeat(5,1fr)",
        gridTemplateRows: "[row1-start] 50px [row1-end]",
        //gridAutoRows: "270px",
      },
    },
    gridTitle: { gridColumn: "1/-1", alignSelf: "center", fontSize: "1.5rem" },
  })
);

const Recommended = () => {
  const classes = useStyles();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  async function getVideos() {
    try {
      let res = await client.get("/video");
      setVideos([...res.data.payload]);
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

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.gridContainer}>
          <Typography className={classes.gridTitle}>
            Recommended for you
          </Typography>
          {videos.map((video) => (
            <div>
              <VideoPreview video={video} />
            </div>
          ))}
        </div>
      </Paper>
    </>
  );
};

export default Recommended;
