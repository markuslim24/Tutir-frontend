import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth";
import { darkModeReducer } from "./slice/darkMode";

//STORE -> GLOBALIZED STATE
const store = configureStore({
  reducer: {
    auth: authReducer,
    darkMode: darkModeReducer,
  },
});

export { store };
