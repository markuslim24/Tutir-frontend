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
import { Typography } from "@material-ui/core";
import { useStyles } from "../styles/pages/profileStyle";

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
