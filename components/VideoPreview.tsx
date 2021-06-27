import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: "100%",
    },
  })
);

const VideoPreview = ({ video }) => {
  const classes = useStyles();
  return (
    <Link href={`/[video]?id=${video.id}`} as={`/video?id=${video.id}`}>
      <div>
        <img src={video.thumbnailUrl} className={classes.img} />
        <Typography variant="h6">{video.title}</Typography>
      </div>
    </Link>
  );
};

export default VideoPreview;
