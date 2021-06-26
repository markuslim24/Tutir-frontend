import React, { useState, useEffect } from "react";
import { client } from "../util/util";
import axios from "axios";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
    },
    gridContainer: {
      width: "90%",
      height: "100%",
      justifySelf: "center",
    },
    gridHeader: {
      margin: "10px 0px",
    },
    gridItem: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "50%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "25%",
      },
    },
    img: {
      maxWidth: "100%",
      height: "auto",
    },
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
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.gridHeader}>
              Recommended for you
            </Typography>
          </Grid>
          {videos.map((video) => (
            <Grid item key={video.id} className={classes.gridItem}>
              <img src={video.thumbnailUrl} className={classes.img} />
              <h3>{video.title}</h3>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Recommended;
