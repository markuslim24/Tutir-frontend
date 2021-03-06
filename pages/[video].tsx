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
import StarOutlineIcon from "@material-ui/icons/StarOutline";
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
    owner: { name: "" },
    tags: [],
    notes: [],
    canTip: false,
    isFavourite: false,
  });
  const [comments, setComments] = useState([]);
  const [openTipDialog, setOpenTipDialog] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getVideo(id);
      getComments(id);
      setIsFavourite(video.isFavourite);
    }
  }, [router]);

  const getVideo = async (id) => {
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
    if (isFavourite) {
      try {
        let res = await client.post(`/video/favourites/remove`, {
          video: video.id,
        });
        setIsFavourite(false);
      } catch (err) {}
    } else {
      try {
        let res = await client.post(`/video/favourites/add`, {
          video: video.id,
        });
        setIsFavourite(true);
      } catch (err) {}
    }
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
            height="70%"
          />

          <Toolbar className={classes.videoToolbar}>
            <div className={classes.videoTitle}>
              <Typography variant="h5">{video.title}</Typography>
              <Typography style={{ flexGrow: 1 }} variant="body2">
                Uploaded by:{video.owner.name}
              </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenTipDialog(true)}
              disabled={!video.canTip}
            >
              TIP
            </Button>
            <TipDialog
              openTipDialog={openTipDialog}
              setOpenTipDialog={setOpenTipDialog}
              videoId={video.id}
            />
            <IconButton onClick={handleFavouriteButtonClick}>
              {isFavourite ? <StarIcon /> : <StarOutlineIcon />}
            </IconButton>
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
