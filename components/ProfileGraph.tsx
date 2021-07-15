import React from "react";
import { Line } from "react-chartjs-2";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: { padding: "2rem", marginBottom: "1rem" },
});

const data = {
  labels: ["May", "June", "July", "August", "September", "October"],
  datasets: [
    {
      label: "Daily Viewership",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const ProfileGraph = () => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root}>
        <div className="header">
          <Typography variant="h6">Statistics</Typography>
          <div className="links"></div>
        </div>
        <Line type="line" data={data} options={options} height={80} />
      </Paper>
    </>
  );
};

export default ProfileGraph;
