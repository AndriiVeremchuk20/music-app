import React, { useCallback, useEffect, useState } from "react";
import AuthWihtGoogle from "@/components/AuthWithGoogleButton";
import Head from "next/head";
import { BiShowAlt, BiHide } from "react-icons/bi";
import Link from "next/link";
import AppRoutes from "@/AppRoutes";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import userAuth from "@/api/actions/userAuth";

interface RegistrationInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repPasword: string;
}

const Registration = () => {
  const auth = getAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegistrationInputs>();

  const registrationMutation = useMutation(userAuth.registration, {
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const onChangeVisiblyPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (data.password === data.repPasword) {
      console.log(data);
      let uid;
      await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((credentials) => {
          console.log(credentials);
          uid = credentials.user.uid;
        })
        .catch((e) => console.log(e.message));
      registrationMutation.mutate({ ...data, uid: uid });
      //router.replace(AppRoutes.home);
    }
    setError("password", {
      type: "custom",
      message: "do not match",
    });
  });

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <div className="w-full h-screen flex bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-50% to-emerald-500 to-90%">
        <div className="m-auto bg-white rounded-sm p-3">
          <form className="w-72 flex flex-col mb-5 m-3" onSubmit={onSubmit}>
            <div className="text-2xl text-center mb-5">Registration</div>
            <label
              htmlFor="f-name"
              className={`flex flex-col border-b ${
                errors.firstName && errors.firstName.type
                  ? "border-red-600"
                  : ""
              } mb-5`}
            >
              <div className="flex">
                First name:{" "}
                {errors.firstName && errors.firstName.type && (
                  <div className="px-1 flex text-red-600">
                    {errors.firstName.message}
                  </div>
                )}
              </div>
              <input
                type="text"
                id="f-name"
                className=" py-1 px-2 outline-none"
                placeholder="Margot"
                {...register("firstName", {
                  required: { value: true, message: "required" },
                  minLength: {
                    value: 2,
                    message: "len more 2",
                  },
                })}
              />
            </label>
            <label
              htmlFor="l-name"
              className={`flex flex-col border-b  mb-5 ${
                errors.lastName && errors.lastName.type ? "border-red-600" : ""
              }`}
            >
              <div className="flex">
                Last name:
                {errors.lastName && errors.lastName.type && (
                  <div className="mx-1 text-red-500">
                    {errors.lastName.message}
                  </div>
                )}
              </div>
              <input
                type="text"
                id="l-name"
                className=" py-1 px-2 outline-none"
                placeholder="Robbie"
                {...register("lastName", {
                  required: { value: true, message: "required" },
                  minLength: {
                    value: 2,
                    message: "len more 2",
                  },
                })}
              />
            </label>
            <label
              htmlFor="email"
              className={`flex flex-col border-b mb-5 ${
                errors.email && errors.email.type ? "border-red-600" : ""
              }`}
            >
              <div className="flex">
                Email:
                {errors.email && errors.email.type && (
                  <div className="mx-1 text-red-500">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <input
                type="email"
                id="email"
                className=" py-1 px-2 outline-none"
                placeholder="example@mail.com"
                {...register("email", {
                  required: { value: true, message: "required" },
                })}
              />
            </label>
            <label
              htmlFor="password"
              className={`flex flex-col border-b mb-5 ${
                errors.lastName && errors.lastName.type ? "border-red-600" : ""
              }`}
            >
              <div className="flex">
                Password:
                {errors.password && errors.password.type && (
                  <div className="mx-1 text-red-500">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className=" py-1 px-2 outline-none"
                  placeholder="password"
                  {...register("password", {
                    required: { value: true, message: "required" },
                  })}
                />
                <button
                  onClick={onChangeVisiblyPassword}
                  type="button"
                  className="text-xl"
                >
                  {showPassword ? <BiShowAlt /> : <BiHide />}
                </button>
              </div>
            </label>
            <label
              htmlFor="rep-password"
              className={`flex flex-col border-b mb-5 ${
                errors.lastName && errors.lastName.type ? "border-red-600" : ""
              }`}
            >
              <div className="flex">
                Rep password:
                {errors.password && errors.password.type && (
                  <div className="mx-1 text-red-500">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  id="rep-password"
                  className=" py-1 px-2 outline-none"
                  placeholder="Repeat password"
                  {...register("repPasword", {
                    required: { value: true, message: "required" },
                  })}
                />
                <button
                  onClick={onChangeVisiblyPassword}
                  type="button"
                  className="text-xl"
                >
                  {showPassword ? <BiShowAlt /> : <BiHide />}
                </button>
              </div>
            </label>
            <div className="mx-auto w-full">
              <button
                type="submit"
                className="w-full bg-orange-400 p-1 hover:bg-opacity-40"
              >
                Sing in
              </button>
            </div>
          </form>
          <div className="border-t pt-5">
            <Link
              href={AppRoutes.auth.login}
              className="underline text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </div>
          <div className="border-t pt-5">
            <AuthWihtGoogle />
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;

/*
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { firebaseApp, googleAuthProvider } from "../../../firebase";

*/

// const auth = getAuth(firebaseApp);
// const [user, setUser] = useState(auth.currentUser);

// useEffect(() => {
//   const unsub = auth.onAuthStateChanged((user) => {
//     if (user) {
//       return setUser(user);
//     }

//     signInWithPopup(auth, googleAuthProvider)
//       .then((credentials) => {
//         setUser(credentials.user);
//       })
//       .catch((e) => console.log(e));

//     //signInWithEmailAndPassword(auth, );
//   });

//   return unsub;
// }, [auth]);

// return <div>{user ? <div>{user.displayName}</div> : <div>Load</div>}</div>;
