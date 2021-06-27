import React, { useState, useEffect } from "react";
import { client } from "../util/util";
import axios from "axios";
import VideoPreview from "./VideoPreview";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
import { Repeat } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
    },
    root2: {
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
        gridAutoRows: "350px",
      },
      [theme.breakpoints.only("sm")]: {
        gridTemplateColumns: "repeat(2,1fr)",
        gridTemplateRows: "[row1-start] 50px [row1-end]",
        gridAutoRows: "300px",
      },
      [theme.breakpoints.only("md")]: {
        gridTemplateColumns: "repeat(3,1fr)",
        gridTemplateRows: "[row1-start] 50px [row1-end]",
        gridAutoRows: "250px",
      },
      [theme.breakpoints.only("lg")]: {
        gridTemplateColumns: "repeat(4,1fr)",
        gridTemplateRows: "[row1-start] 50px [row1-end]",
        gridAutoRows: "230px",
      },
      [theme.breakpoints.up("xl")]: {
        gridTemplateColumns: "repeat(5,1fr)",
        gridTemplateRows: "[row1-start] 50px [row1-end]",
        gridAutoRows: "270px",
      },
    },
    gridTitle: { gridColumn: "1/-1" },
    gridHeader: {
      margin: "10px 0px",
    },
    gridItem: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        maxWidth: "50%",
        minHeight: "300px",
        maxHeight: "200px",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "50%",
        minHeight: "300px",
        maxHeight: "200px",
      },
      [theme.breakpoints.up("lg")]: {
        width: "26rem",
        margin: "auto",
      },
    },
    gridItem2: {},
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
      {/* <div className={classes.root}>
        <Grid container spacing={2} alignItems="stretch">
          <Grid item xs={12} className={classes.gridItem2}>
            <Typography variant="h5" className={classes.gridHeader}>
              Recommended for you
            </Typography>
          </Grid>
          {videos.map((video) => (
            <Grid item key={video.id} lg={3} md={4} sm={6} xs={12}>
              {" "}
              <VideoPreview video={video} />
            </Grid>
          ))}
        </Grid>
      </div> */}
      <div className={classes.root2}>
        <div className={classes.gridContainer}>
          <div className={classes.gridTitle}>Recommended for you</div>
          {videos.map((video) => (
            <div className={classes.gridItem2}>
              <VideoPreview video={video} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Recommended;
