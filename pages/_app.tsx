import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { CreatePollContextProvider, AuthContextProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CreatePollContextProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </CreatePollContextProvider>
  );
}
export default MyApp;
