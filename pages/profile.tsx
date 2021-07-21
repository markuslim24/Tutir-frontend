import React, { useState, useEffect } from "react";
import { getUser } from "../store/slice/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { isLoggedIn } from "../store/slice/auth";
import ProfileGraph from "../components/ProfileGraph";
import { client } from "../util/util";
import ChangeProfilePictureDialog from "../components/ChangeProfilePictureDialog";
import EditProfileDialog from "../components/EditProfileDialog";
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
  const router = useRouter();

  const [openProfilePicture, setOpenProfilePicture] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [stripeButtonDisabled, setStripeButtonDisabled] = useState(false);
  const [stripeButtonMessage, setStripeButtonMessage] = useState(
    "Link Stripe Account"
  );

  useEffect(() => {
    if (user) {
      if (user.stripeConnected) {
        setStripeButtonMessage("Stripe Account Linked");
        setStripeButtonDisabled(true);
      } else {
        setStripeButtonMessage("Link Stripe Account");
        setStripeButtonDisabled(false);
      }
    }
  }, [user]);

  const handleLinkStripeButton = async () => {
    try {
      setStripeButtonDisabled(true);
      await client.get(`/stripe/onboard`).then((res) => {
        window.location.href = res.data.payload;
      });
    } catch (err) {
    } finally {
      setStripeButtonDisabled(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <div className={classes.profileBar}>
          <ChangeProfilePictureDialog
            user={user}
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
              {isAuth ? user.name + "'s Profile" : "Not Authenticated"}
            </Typography>
            <Button
              variant="outlined"
              className={classes.editProfileButton}
              onClick={() => setOpenEditProfile(true)}
            >
              Edit Name
            </Button>
            <EditProfileDialog
              user={user}
              openEditProfile={openEditProfile}
              setOpenEditProfile={setOpenEditProfile}
            />
            <Button
              variant="outlined"
              className={classes.linkStripeButton}
              disabled={stripeButtonDisabled}
              onClick={handleLinkStripeButton}
            >
              {stripeButtonMessage}
            </Button>
          </div>
        </div>
        <ProfileGraph />
        <VideoTable user={user} />
      </Container>
    </>
  );
}
