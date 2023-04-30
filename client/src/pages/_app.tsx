import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/layaut/Header";

const AppWrapper = (props: any) => {
  return <QueryClientProvider client={new QueryClient()} {...props} />;
};

const AppInner = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

const App = (props: AppProps) => {
  return (
    <>
      <AppWrapper>
        <Header />
        <AppInner {...props} />
      </AppWrapper>
    </>
  );
};

export default App;
