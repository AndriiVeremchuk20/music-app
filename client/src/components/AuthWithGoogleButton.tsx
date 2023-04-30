import React, { useCallback, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { firebaseApp, googleAuthProvider } from "../../firebase";
import { FcGoogle } from "react-icons/fc";
import { useAtom } from "jotai";
import { userAtom } from "@/atom";
import { useMutation } from "@tanstack/react-query";
import userAuth from "@/api/actions/userAuth";

const SignInWithGoogleButton = () => {
  const auth = getAuth();
  const [, setUser] = useAtom(userAtom);

  const registrationMutation = useMutation(userAuth.registration, {
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((credentials) => {
        setUser(credentials.user);
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
