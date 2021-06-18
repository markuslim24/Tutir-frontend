import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { getUser, isLoggedIn } from "../store/slice/auth";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import VideoTable from "../components/VideoTable";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  profileBar: {
    margin: "20px 0px",
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
  avatar: {
    alignSelf: "center",
    width: "100px",
    height: "100px",
  },
  profileInfo: { marginLeft: "20px", alignSelf: "center" },
  greeting: {
    position: "relative",
    padding: "4px",
  },
  editProfileButton: { position: "relative", top: "0px" },
});

export default function Profile() {
  const classes = useStyles();
  const user = useSelector(getUser);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <div className={classes.profileBar}>
          <Avatar src="Avatar.png" className={classes.avatar} />
          <div className={classes.profileInfo}>
            <Typography variant="h4" className={classes.greeting}>
              Hi {user.name}
            </Typography>
            <Button variant="outlined" className={classes.editProfileButton}>
              Edit Profile
            </Button>
          </div>
        </div>
        <div>Statistics</div>
        <VideoTable />
      </Container>
    </>
  );
}
