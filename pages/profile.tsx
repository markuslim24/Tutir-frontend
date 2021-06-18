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

export default function Profile() {
  const user = useSelector(getUser);

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md">
        <div>
          <Avatar src="Avatar.png" />
          <h1>Hi {user.name}</h1>
          <Button>Edit Profile</Button>
        </div>
        <div>Statistics</div>
        <VideoTable />
      </Container>
    </>
  );
}
