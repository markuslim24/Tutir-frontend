//imports
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../store/slice/auth";

//Home page
export default function Home() {
  const [message, setMessage] = useState("");
  const isAuthenticated = useSelector(isLoggedIn);

  return (
    <>
      {isAuthenticated ? (
        <>
          <h1>user authenticated</h1>
        </>
      ) : (
        <h1>User not authenticated</h1>
      )}
      <h1>{message}</h1>
    </>
  );
}
