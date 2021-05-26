import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice/auth";

const store = configureStore({
  reducer: {
    auth: authReducer
  },
});

export { store };