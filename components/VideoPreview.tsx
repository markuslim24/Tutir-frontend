import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    previewContainer: { width: "100%", height: "100%" },
    img: {
      width: "100%",
      height: "80%",
    },
  })
);

const VideoPreview = ({ video }) => {
  const classes = useStyles();
  return (
    <Link href={`/[video]?id=${video.id}`} as={`/video?id=${video.id}`}>
      <div className={classes.previewContainer}>
        <img src={video.thumbnailUrl} className={classes.img} />
        <Typography variant="h6">{video.title}</Typography>
      </div>
    </Link>
  );
};

export default VideoPreview;
