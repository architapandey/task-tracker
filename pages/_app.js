import { AppContextProvider } from "'@/store/context'";
import "../styles/globals.css";
import { RhThemeProvider, RhToastContainer } from "@rhythm-ui/react";
// import { Provider } from "react-redux";
// import { store } from "../store";

export default function App({ Component, pageProps }) {
  return (
    <RhThemeProvider theme="light">
      <AppContextProvider>
        <RhToastContainer />
        <Component {...pageProps} />
      </AppContextProvider>
    </RhThemeProvider>
  );
}
