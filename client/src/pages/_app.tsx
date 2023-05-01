import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { useEffect } from "react";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { Header } from "@/layaut/Header";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase";
import userAuth from "@/api/actions/userAuth";
import { Loader } from "@/components/Loader";

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
//export const firebaseAnalytics = getAnalytics(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

const AppWrapper = (props: any) => {
  return <QueryClientProvider client={new QueryClient()} {...props} />;
};

const AppInner = ({ Component, pageProps }: AppProps) => {
  const auth = getAuth();
  const [, setUser] = useAtom(userAtom);

  const authMutation = useMutation(userAuth.auth, {
    onSuccess(data) {
      console.log(data);
      setUser(data.user);
    },
    onError(e) {
      console.log(e);
    },
  });

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((mbUser) => {
      if (mbUser) {
        console.log(mbUser.uid);
        return authMutation.mutate({ uid: mbUser.uid, type: "Auth" });
      }
    });

    return unsub;
  }, []);

  return (
    <>
      {authMutation.isLoading ? <Loader /> : null}
      <Component {...pageProps} />
    </>
  );
};

const App = (props: AppProps) => {
  return (
    <>
      <AppWrapper>
        <Header />
        <div className="bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-50% to-emerald-500 to-90%">
          <AppInner {...props} />
        </div>
      </AppWrapper>
    </>
  );
};

export default App;
