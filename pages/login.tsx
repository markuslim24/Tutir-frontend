//imports
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useCallback, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { login } from "../store/slice/auth";
import { client } from "../util/util";

//Login Page
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  //send email/password to backend for authentication
  const send = useCallback(async () => {
    try {
      let res = await client.post("/auth/login", {
        email: email,
        password: password,
      });
      dispatch(login(res.data.payload));
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        let code = err.response?.data.code;
        if (code === "invalid_params") {
          return alert("invalid_params");
        } else if (code === "auth_login_failed") {
          return alert("incorrect password or email");
        }
      }
      throw err;
    }
  }, [email, password, router, dispatch]);
  return (
    <div>
      Email:{" "}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      Password:{" "}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={send}>Login</button>
    </div>
  );
}
