import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { loggedIn: false },
  reducers: {
    setSession(state: any, action: any) {
      return action.payload;
    },
    setUser(state: any, action: any) {
      state.user = action.payload;
    },
  },
});

//State selectors
export function isLoggedIn(state: any): boolean {
  return state.auth.loggedIn;
}

export function getUser(state: any): any {
  return state.auth.user;
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

const { setSession, setUser } = authSlice.actions;

//actions
export function initializeAuthState() {
  let loggedIn = window.localStorage.getItem("auth.loggedIn") === "true";
  let session = {};
  let user = {};
  if (loggedIn) {
    session = JSON.parse(window.localStorage.getItem("auth.session") || "");
    user = JSON.parse(window.localStorage.getItem("auth.user") || "");
  }
  return setSession({
    loggedIn: loggedIn,
    session: session,
    user: user,
  });
}

function storeAuthState(auth: any) {
  if (auth.loggedIn) {
    window.localStorage.setItem("auth.loggedIn", "true");
    window.localStorage.setItem("auth.session", JSON.stringify(auth.session));
    window.localStorage.setItem("auth.user", JSON.stringify(auth.user));
  } else {
    window.localStorage.removeItem("auth.loggedIn");
    window.localStorage.removeItem("auth.session");
    window.localStorage.removeItem("auth.user");
  }
}

function storeUser(user: any) {
  window.localStorage.setItem("auth.user", JSON.stringify(user));
}

export function login(payload: any) {
  let auth = { loggedIn: true, ...payload };
  storeAuthState(auth);
  return setSession(auth);
}

export function updateUser(payload: any) {
  storeUser(payload);
  setUser(payload);
}

export function logOut() {
  let auth = { loggedIn: false };
  storeAuthState(auth);
  return setSession(auth);
}

export const authReducer = authSlice.reducer;
