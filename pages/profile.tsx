import React, { useState, useEffect } from "react";
import { getUser } from "../store/slice/auth";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../store/slice/auth";

import ChangeProfilePictureDialog from "../components/ChangeProfilePictureDialog";
import Navbar from "../components/Navbar";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import VideoTable from "../components/VideoTable";
import { Typography } from "@material-ui/core";
import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";
import { useStyles } from "../styles/pages/profileStyle";

export default function Profile() {
  const classes = useStyles();
  const isAuth = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  const [openProfilePicture, setOpenProfilePicture] = useState(false);
  console.log(user);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <div className={classes.profileBar}>
          <ChangeProfilePictureDialog
            openProfilePicture={openProfilePicture}
            setOpenProfilePicture={setOpenProfilePicture}
          />
          <div
            className={classes.avatarContainer}
            onClick={() => setOpenProfilePicture(true)}
          >
            <Avatar
              src={user ? user.profileImageUrl : ""}
              className={classes.avatar}
            />
            <div className={classes.changeProfilePicture}>
              <FlipCameraIosIcon
                style={{
                  display: "block",
                  width: "40%",
                  height: "40%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "8px",
                }}
              />
              <Typography
                style={{
                  fontSize: "0.9rem",
                }}
              >
                Edit profile image
              </Typography>
            </div>
          </div>
          <div className={classes.profileInfo}>
            <Typography variant="h4" className={classes.greeting}>
              {isAuth ? "Hi " + user.name : "Not Authenticated"}
            </Typography>
            <Button variant="outlined" className={classes.editProfileButton}>
              Edit Profile
            </Button>
          </div>
        </div>
        <div>Statistics</div>
        <VideoTable user={user} />
      </Container>
    </>
  );
}
