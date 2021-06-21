//imports
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CssBaseline from "@material-ui/core/CssBaseline";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { initializeAuthState } from "../store/slice/auth";
import React, { useEffect } from "react";
import theme from "../styles/muiTheme";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

//Global Main
function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const themetmp = React.useMemo(
    () => theme(prefersDarkMode),
    [prefersDarkMode]
  );

  useEffect(() => {
    store.dispatch(initializeAuthState());
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={themetmp}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
