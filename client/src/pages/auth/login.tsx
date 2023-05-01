import AppRoutes from "@/AppRoutes";
import userAuth from "@/api/actions/userAuth";
import { userAtom } from "@/atom";
import AuthWihtGoogle from "@/components/AuthWithGoogleButton";
import { Loader } from "@/components/Loader";
import { useMutation } from "@tanstack/react-query";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAtom } from "jotai";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { BiShowAlt, BiHide } from "react-icons/bi";

interface LoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const auth = getAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onChangeVisiblyPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const loginMutation = useMutation(userAuth.auth, {
    onSuccess(data) {
      //console.log(data);
      setUser(data.user);
      router.replace(AppRoutes.home);
    },
    onError(e) {
      console.log(e);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((credentials) => {
        console.log(credentials);
        loginMutation.mutate({ uid: credentials.user.uid, type: "Login" });
      })
      .catch((e) => console.log(e.message));
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {loginMutation.isLoading ? <Loader /> : null}
      <div className="w-full h-screen flex bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-50% to-emerald-500 to-90%">
        <div className="m-auto bg-white p-3 rounded-sm">
          <form className="flex flex-col mb-5" onSubmit={onSubmit}>
            <div className="text-2xl text-center mb-5">Login</div>
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
                className=" py-1 px-2 text-xl outline-none"
                placeholder="example@mail.com"
                {...register("email", {
                  required: { value: true, message: "required" },
                })}
              />
            </label>
            <label
              htmlFor="password"
              className={`flex flex-col border-b mb-5 ${
                errors.email && errors.email.type ? "border-red-600" : ""
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
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className=" py-1 px-2 text-xl outline-none"
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
              href={AppRoutes.auth.registration}
              className="underline text-blue-600 hover:text-blue-700"
            >
              Registration
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

export default Login;
