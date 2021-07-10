//imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, isLoggedIn } from "../store/slice/auth";
import Navbar from "../components/Navbar";
import Recommended from "../components/Recommended";
import { Container } from "@material-ui/core";

//Home page
export default function Home() {
  const isAuthenticated = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  return (
    <>
      <Navbar />
      <Container maxWidth="xl">
        {isAuthenticated ? (
          <>
            <h1>Hi {user.name}</h1>
          </>
        ) : (
          ""
        )}
        <Recommended />
      </Container>
    </>
  );
}
