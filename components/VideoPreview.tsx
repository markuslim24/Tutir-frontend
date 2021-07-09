import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Card } from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    previewContainer: {
      width: "100%",
      height: "100%",
      padding: "10px",
      backgroundColor: theme.palette.background.default,
    },
    img: {
      width: "100%",
      height: "80%",
    },
  })
);

const imageLoader = ({ src }) => {
  return src;
};

const VideoPreview = ({ video }) => {
  const classes = useStyles();
  return (
    <Link href={`/[video]?id=${video.id}`} as={`/video?id=${video.id}`}>
      <Card className={classes.previewContainer}>
        {/* <img src={video.thumbnailUrl} className={classes.img} /> */}
        <Image
          loader={imageLoader}
          src={video.thumbnailUrl}
          width={640}
          height={360}
          layout="responsive"
          priority={true}
        />
        <Typography variant="h6">{video.title}</Typography>
      </Card>
    </Link>
  );
};

export default VideoPreview;
