import React, { useState, useEffect } from "react";
import Image from "next/image";
import { client } from "../util/util";
import axios from "axios";
import Navbar from "../components/Navbar";
import VideoPreview from "../components/VideoPreview";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Paper, Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: theme.spacing(4),
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    gridContainer: {
      width: "95%",
      height: "100%",
      justifySelf: "center",
    },
    gridTitle: {
      fontSize: "1.5rem",
    },
  })
);

function Favourites() {
  const classes = useStyles();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  async function getVideos() {
    try {
      let res = await client.get("/video/favourites");
      setVideos([...res.data.payload]);
    } catch (err) {}
  }
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Paper className={classes.root}>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={12}>
              <Typography className={classes.gridTitle}>Favourites</Typography>
            </Grid>
            {videos.map((video) => (
              <Grid item key={video.id} xs={12} sm={6} md={4} lg={3}>
                <VideoPreview video={video} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

export default Favourites;
