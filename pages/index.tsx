//imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, isLoggedIn } from "../store/slice/auth";
import Navbar from "../components/Navbar";

//Home page
export default function Home() {
  const [message, setMessage] = useState("");
  const isAuthenticated = useSelector(isLoggedIn);
  const user = useSelector(getUser);
  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <>
          <h1>Hi {user.name}</h1>
        </>
      ) : (
        <h1>User not authenticated</h1>
      )}
      <h1>{message}</h1>
    </>
  );
}
