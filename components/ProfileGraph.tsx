import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { client } from "../util/util";

const useStyles = makeStyles({
  root: { padding: "1.5rem", paddingTop: "1rem", marginBottom: "1rem" },
});

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
          stepSize: 1,
        },
      },
    ],
  },
};

const ProfileGraph = ({ user }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  async function getData() {
    let res = await client.get(`/video/viewership?creatorId=${user.id}`);
    setData(res.data.payload);
  }

  const curDate = new Date();

  function getViewsOfMonth(data) {
    const dataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const monthArr = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    for (const month in data) {
      const monthIndex = monthArr.indexOf(month);
      dataArr[monthIndex] = data[month];
    }
    return dataArr;
  }

  const filteredData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: `Monthly Viewership for ${curDate.getFullYear()}`,
        data: getViewsOfMonth(data),
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root}>
        <div className="header">
          <Typography variant="h6">Statistics</Typography>
          <div className="links"></div>
        </div>
        <Line type="line" data={filteredData} options={options} height={80} />
      </Paper>
    </>
  );
};

export default ProfileGraph;
