//imports

import CssBaseline from "@material-ui/core/CssBaseline";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { initializeAuthState } from "../store/slice/auth";
import { initializeDarkModeState } from "../store/slice/darkMode";
import React, { useEffect } from "react";

import CustomThemeProvider from "../styles/CustomThemeProvider";

//Global Main
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    //remove server-side injected CSS
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    //initialize authentication state
    store.dispatch(initializeAuthState());

    //initialize darkMode
    store.dispatch(initializeDarkModeState());
  }, []);
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </CustomThemeProvider>
    </Provider>
  );
}
export default MyApp;
