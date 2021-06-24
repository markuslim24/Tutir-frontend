import React from "react";
import { useSelector } from "react-redux";
import { isPreferDarkMode } from "../store/slice/darkMode";
import theme from "./muiTheme";
import { ThemeProvider } from "@material-ui/styles";

const CustomThemeProvider = ({ children }: any) => {
  const prefersDarkMode = useSelector(isPreferDarkMode);
  const themetmp = React.useMemo(
    () => theme(prefersDarkMode),
    [prefersDarkMode]
  );
  return <ThemeProvider theme={themetmp}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
