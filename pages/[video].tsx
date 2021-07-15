import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { client } from "../util/util";
import { getUser } from "../store/slice/auth";
import ReactPlayer from "react-player";
import Navbar from "../components/Navbar";
import Tag from "../components/Tag";
import AddAComment from "../components/AddAComment";
import CommentPreview from "../components/CommentPreview";
import TipDialog from "../components/TipDialog";
import {
  Button,
  Container,
  Divider,
  Typography,
  Toolbar,
  Tooltip,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useStyles } from "../styles/pages/[video]Style";

const Video = () => {
  const classes = useStyles();
  const user = useSelector(getUser);
  const router = useRouter();
  const [video, setVideo] = useState({
    id: "",
    title: "",
    description: "",
    url: "",
    thumbnailUrl: "",
    tags: [],
    notes: [],
  });
  const [comments, setComments] = useState([]);
  const [openTipDialog, setOpenTipDialog] = useState(false);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getVideos(id);
      getComments(id);
    }
  }, [router]);

  const getVideos = async (id) => {
    await client.get(`/video?id=${id}`).then((res) => {
      setVideo(res.data.payload);
    });
  };

  const getComments = async (id) => {
    await client.get(`/comment?videoId=${id}`).then((res) => {
      setComments(res.data.payload);
    });
  };

  const handleFavouriteButtonClick = async () => {
    try {
      let res = await client.post(`/video/favourites`, { video: video.id });
    } catch (err) {}
  };

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
            <Typography variant="h5" className={classes.videoTitle}>
              {video.title}
            </Typography>
            <Tooltip title="Tip">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenTipDialog(true)}
              >
                $TIP
              </Button>
            </Tooltip>
            <TipDialog
              openTipDialog={openTipDialog}
              setOpenTipDialog={setOpenTipDialog}
            />
            <Tooltip title="Add to Favourites">
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
          <CardContent className={classes.commentsCards}>
            {user ? (
              <AddAComment
                user={user}
                videoId={video.id}
                refreshComments={getComments}
              />
            ) : (
              ""
            )}
          </CardContent>
          <Divider />
          {comments.map((comment) => (
            <CardContent key={comment.id} className={classes.commentsCards}>
              <CommentPreview user={comment.owner} text={comment.text} />
            </CardContent>
          ))}
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
