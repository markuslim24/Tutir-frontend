import axios from "axios";
import {
  getRefreshExpiryMs,
  getSessionExpiryMs,
  getSessionToken,
  isLoggedIn,
  login,
  logOut,
} from "../store/slice/auth";
import Router from "next/router";
import { store } from "../store/store";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

//Only accessible when logged in
const protectedRoutes = [
  /user/,
  /\/video\/upload/,
  /\/video\/favourites/,
  /\/video\/history/,
  /\/video\/delete/,
  /\/comment\/add/,
];

const optionalRoutes = [/\/video\?id=/, /^\/video$/];

class LoginError extends Error {
  constructor() {
    super("User not logged in");
  }
}

function refreshSession() {
  return client
    .get("/auth/refresh")
    .then((res) => {
      store.dispatch(login(res.data.payload));
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        let code = err.response?.data.code;
        if (code === "auth_refresh_failed") {
          throw new LoginError();
        }
      }
      throw err;
    });
}

client.interceptors.request.use(async (req) => {
  try {
    const url = req.url || "";
    let isProtectedRoute = false;
    let isOptionalRoute = false;
    protectedRoutes.forEach((regex) => {
      if (url.match(regex)) {
        isProtectedRoute = true;
      }
    });
    optionalRoutes.forEach((regex) => {
      if (url.match(regex)) {
        isOptionalRoute = true;
      }
    });
    if (!isProtectedRoute && !isOptionalRoute) {
      return req;
    }
    let loggedIn = isLoggedIn(store.getState());
    if (loggedIn) {
      let sessionExpiry = getSessionExpiryMs(store.getState());
      let refreshExpiry = getRefreshExpiryMs(store.getState());
      let currentTime = Date.now();
      if (sessionExpiry < currentTime && currentTime < refreshExpiry) {
        await refreshSession();
      } else if (sessionExpiry < currentTime && refreshExpiry < currentTime) {
        throw new LoginError();
      }
      let sessionToken = getSessionToken(store.getState());
      req.headers = { Authorization: `Bearer ${sessionToken}` };
      return req;
    } else if (isOptionalRoute) {
      return req;
    }
    throw new LoginError();
  } catch (err) {
    if (err instanceof LoginError) {
      alert("You are no longer logged in");
      store.dispatch(logOut());
      Router.push("/login");
      return {
        ...req,
        cancelToken: new axios.CancelToken((cancel) =>
          cancel("Request cancelled")
        ),
      };
    }
    throw err;
  }
});

export { client };
