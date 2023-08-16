import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
