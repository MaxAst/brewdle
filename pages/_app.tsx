import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { CreateActivityContextProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CreateActivityContextProvider>
      <Component {...pageProps} />
    </CreateActivityContextProvider>
  );
}
export default MyApp;
