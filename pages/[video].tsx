import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { client } from "../util/util";
import axios from "axios";

import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    videoContainer: {
      width: "640px",
      height: "360px",
      backgroundColor: "black",
    },
    img: {
      width: "100%",
    },
  })
);

const Video = ({ video }) => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <div className={classes.videoContainer}>
              {<ReactPlayer url={video.url} controls={true} />}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const { id } = context.query;
    let res = await client.get(`/video?id=${id}`);
    const video = res.data.payload;
    return {
      props: {
        video,
      },
    };
  } catch (err) {}
};

export default Video;
