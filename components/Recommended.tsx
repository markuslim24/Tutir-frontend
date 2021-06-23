import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { Typography, Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      backgroundColor: theme.palette.background.paper,
    },
    gridContainer: {
      width: "90%",
      height: "100%",
      justifyContent: "center",
    },
    gridHeader: {
      margin: "10px 0px",
    },
    gridItem: {
      [theme.breakpoints.down("xs")]: {
        width: "100%",
      },
      [theme.breakpoints.up("sm")]: {
        width: "50%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "25%",
      },
    },
    img: {
      maxWidth: "100%",
      height: "auto",
    },
  })
);

const exampleDatas = [
  { thumbnail: "this", title: "Video1" },
  { thumbnail: "better", title: "Video2" },
  { thumbnail: "work", title: "Video3" },
  { thumbnail: "well", title: "Video4" },
  { thumbnail: "this", title: "Video5" },
  { thumbnail: "better", title: "Video6" },
  { thumbnail: "work", title: "Video7" },
  { thumbnail: "well", title: "Video8" },
  { thumbnail: "this", title: "Video9" },
  { thumbnail: "better", title: "Video10" },
  { thumbnail: "work", title: "Video11" },
  { thumbnail: "well", title: "Video12" },
  { thumbnail: "this", title: "Video13" },
  { thumbnail: "better", title: "Video14" },
  { thumbnail: "work", title: "Video15" },
  { thumbnail: "well", title: "Video16" },
];

const filteredDatas = exampleDatas.slice(0, 8);

const Recommended = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.gridHeader}>
              Recommended for you
            </Typography>
          </Grid>
          {filteredDatas.map((filteredData) => (
            <Grid item key={filteredData.title} className={classes.gridItem}>
              <img src="/black.png" className={classes.img} />
              <h3>{filteredData.thumbnail}</h3>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Recommended;
