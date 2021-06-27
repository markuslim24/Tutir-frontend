import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { client } from "../util/util";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing(6),
    },

    gridItem: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "56rem",
        height: "35rem",
      },
    },
    videoTitle: {
      flexGrow: 1,
    },
    favouriteIcon: {
      justifySelf: "right",
    },
    videoContainer: {
      width: "90%",
      marginTop: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
    gridComments: {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        minWidth: "80px",
      },
      backgroundColor: "grey",
    },
  })
);

const Video = ({ video }) => {
  const classes = useStyles();

  const handleFavouriteButtonClick = async () => {
    try {
      let res = await client.post(`/video/favourites`, { video: video.id });
    } catch (err) {}
  };

  return (
    <>
      <Navbar />
      <Container className={classes.root}>
        <div className={classes.gridItem}>
          <ReactPlayer
            url={video.url}
            controls={true}
            width="100%"
            height="90%"
          />

          <Toolbar>
            <Typography variant="h4" className={classes.videoTitle}>
              {video.title}
            </Typography>
            <Tooltip
              title="Add to Favourites"
              className={classes.favouriteIcon}
            >
              <IconButton onClick={handleFavouriteButtonClick}>
                <StarIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </div>
        {/*<div className={classes.gridComments}>Comments Panel</div>*/}
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
