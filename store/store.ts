import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth";

//STORE -> GLOBALIZED STATE
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export { store };
