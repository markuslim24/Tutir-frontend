import React from "react";
import ReactPlayer from "react-player";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Tag from "../components/Tag";
import AddAComment from "../components/AddAComment";
import { client } from "../util/util";
import { useSelector } from "react-redux";
import { getUser } from "../store/slice/auth";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  Chip,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      marginTop: theme.spacing(6),
    },

    flexItem: {
      width: "56rem",
      height: "auto",
      flexGrow: 1,
      padding: "10px",
    },
    videoToolbar: {
      display: "flex",
      flexWrap: "wrap",
      padding: "0px",
      width: "100%",
    },
    videoTitle: {
      flexGrow: 1,
    },
    tagsContainer: { height: "75px" },
    favouriteIcon: {},
    videoContainer: {
      width: "90%",
      marginTop: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
    descriptionAndNotes: {
      marginTop: "10px",
      width: "16rem",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
    },
    descriptionPanel: {
      width: "100%",
      flexGrow: 1,

      minHeight: "7rem",
      maxHeight: "15rem",
    },
    notesPanel: {
      marginTop: "10px",
      width: "100%",
      flexGrow: 1,
    },
    commentsPanel: {
      marginTop: "10px",
      width: "100%",
      flexGrow: 1,
    },
  })
);

const Video = () => {
  const classes = useStyles();
  const user = useSelector(getUser);
  const [video, setVideo] = useState({
    id: "",
    title: "",
    description: "",
    url: "",
    thumbnailUrl: "",
    tags: [],
    notes: [],
  });
  const router = useRouter();
  const handleFavouriteButtonClick = async () => {
    try {
      let res = await client.post(`/video/favourites`, { video: video.id });
    } catch (err) {}
  };
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      client.get(`/video?id=${id}`).then((res) => {
        setVideo(res.data.payload);
      });
    }
  }, [router]);
  return (
    <>
      <Navbar />
      <Container className={classes.root}>
        <div className={classes.flexItem}>
          <ReactPlayer
            url={video.url}
            controls={true}
            width="100%"
            height="80%"
          />

          <Toolbar className={classes.videoToolbar}>
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
          <div className={classes.tagsContainer}>
            {video.tags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        </div>
        <div className={classes.descriptionAndNotes}>
          <Card className={classes.descriptionPanel}>
            <CardContent>
              <Typography variant="h5">Description</Typography>
              <Typography variant="body2">
                <br />
                {video.description}
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.notesPanel}>
            <CardContent>
              <Typography variant="h5">Notes</Typography>
              <br />
            </CardContent>
            {video.notes.map((note, index) => (
              <CardHeader
                key={note}
                title={`Note ${index + 1}`}
                action={
                  <a href={note} download>
                    <IconButton aria-label="download">
                      <GetAppIcon />
                    </IconButton>
                  </a>
                }
              ></CardHeader>
            ))}
          </Card>
        </div>
        <Card className={classes.commentsPanel}>
          <CardContent>
            <Typography variant="h5">Comments</Typography>
          </CardContent>
          <CardContent>
            <AddAComment user={user} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

// export const getServerSideProps = async (context) => {
//   try {
//     const { id } = context.query;
//     let res = await client.get(`/video?id=${id}`);
//     const video = res.data.payload;
//     return {
//       props: {
//         video,
//       },
//     };
//   } catch (err) {}
// };

export default Video;
