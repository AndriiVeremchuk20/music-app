import React, { useCallback, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { googleAuthProvider } from "@/pages/_app";
import { FcGoogle } from "react-icons/fc";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { useMutation } from "@tanstack/react-query";
import userAuth from "@/api/actions/userAuth";
import { useRouter } from "next/router";
import AppRoutes from "@/AppRoutes";

const SignInWithGoogleButton = () => {
  const auth = getAuth();
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();

  const registrationMutation = useMutation(userAuth.authWithGoogle, {
    onSuccess(data) {
      console.log(data);
      router.replace(AppRoutes.home);
    },
    onError(error) {
      console.log(error);
    },
  });

  const authMutation = useMutation(userAuth.auth, {
    onSuccess(data) {
      setUser(data.user);
      router.replace(AppRoutes.home);
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSignInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then((credentials) => {
        if (credentials.user.displayName || credentials.user.email) {
          registrationMutation.mutate({
            uid: credentials.user.uid,
            firstName: credentials.user.displayName?.split(" ")[0] || "",
            lastName: credentials.user.displayName?.split(" ")[1] || "",
            email: credentials.user.email || "",
            avatarUrl: credentials.user.photoURL,
          });

          authMutation.mutate({ type: "Auth", uid: credentials.user.uid });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <button
      onClick={handleSignInWithGoogle}
      className="flex p-1 border shadow-md hover:opacity-70"
    >
      Sign in with Google <FcGoogle className="text-2xl px-1" />
    </button>
  );
};

export default SignInWithGoogleButton;
