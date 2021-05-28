import { Store } from "@reduxjs/toolkit";

const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: { loggedIn: false },
  reducers: {
    setSession(state: any, action: any) {
      return action.payload;
    },
  },
});

//State selectors
export function isLoggedIn(state: any): boolean {
  return state.auth.loggedIn;
}

export function getUser(state: any): any {
  return state.auth.session?.user;
}

export function getSessionToken(state: any): string {
  return state.auth.session?.token;
}

export function getSessionExpiryMs(state: any): number {
  return state.auth.session?.expiry;
}

export function getRefreshExpiryMs(state: any): number {
  return state.auth.session?.refreshExpiry;
}

const { setSession } = authSlice.actions;

//actions
export function initializeAuthState() {
  let loggedIn = window.localStorage.getItem("auth.loggedIn") === "true";
  let session = {};
  if (loggedIn) {
    session = JSON.parse(window.localStorage.getItem("auth.session") || "");
  }
  return setSession({
    loggedIn: loggedIn,
    session: session,
  });
}

function storeAuthState(auth: any) {
  if (auth.loggedIn) {
    window.localStorage.setItem("auth.loggedIn", "true");
    window.localStorage.setItem("auth.session", JSON.stringify(auth.session));
  } else {
    window.localStorage.removeItem("auth.loggedIn");
    window.localStorage.removeItem("auth.session");
  }
}

export function login(payload: any) {
  let auth = { loggedIn: true, session: payload };
  storeAuthState(auth);
  return setSession(auth);
}

export function logOut() {
  let auth = { loggedIn: false };
  storeAuthState(auth);
  return setSession(auth);
}

export const authReducer = authSlice.reducer;
