import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = (prefersDarkMode: boolean) =>
  prefersDarkMode
    ? //Dark Theme
      createMuiTheme({
        palette: {
          primary: {
            main: "#179e8b",
          },
          secondary: {
            main: "#179e8b",
          },
          background: {
            default: "#303030",
            paper: "#424242",
          },
          text: {
            primary: "#fff",
            secondary: "rgba(255, 255, 255, 0.7)",
          },
          action: {
            active: "#fff",
            hover: "rgba(255, 255, 255, 0.08)",
          },
        },
      })
    : //Light Theme
      createMuiTheme({
        palette: {
          primary: {
            main: "#179e8b",
          },
          secondary: {
            main: "#179e8b",
          },
          background: {
            default: "#FAF9F9",
            paper: "fff",
          },
        },
      });
export default theme;
