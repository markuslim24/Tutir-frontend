import React from "react";
import { client } from "../../util/util";
import Navbar from "../../components/Navbar";
import VideoPreview from "../../components/VideoPreview";
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

const TagPage = ({ tag, videos }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        <Paper className={classes.root}>
          <Grid container spacing={3} className={classes.gridContainer}>
            <Grid item xs={12}>
              <Typography className={classes.gridTitle}>
                Videos tagged as: {tag}
              </Typography>
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
};

export const getServerSideProps = async (context) => {
  try {
    const { tag } = context.query;
    let res = await client.get(`/video?tag=${tag}`);
    const videos = res.data.payload;
    return {
      props: {
        tag,
        videos,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export default TagPage;
