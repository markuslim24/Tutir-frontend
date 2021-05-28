//imports
import CssBaseline from "@material-ui/core/CssBaseline";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { initializeAuthState } from "../store/slice/auth";
import { useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../styles/muiTheme";

//Global Main
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    store.dispatch(initializeAuthState());
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </Provider>
  );
}
export default MyApp;
