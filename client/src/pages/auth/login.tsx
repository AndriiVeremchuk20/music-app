import AppRoutes from "@/AppRoutes";
import AuthWihtGoogle from "@/components/AuthWithGoogleButton";
import Head from "next/head";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { BiShowAlt, BiHide } from "react-icons/bi";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChangeVisiblyPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-full h-screen flex bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-50% to-emerald-500 to-90%">
        <div className="m-auto bg-white p-4 rounded-sm">
          <form className="flex flex-col mb-5">
            <div className="text-2xl text-center mb-5">Login</div>
            <label htmlFor="email" className="flex flex-col border-b mb-5">
              Email:
              <input
                type="text"
                id="email"
                className=" py-1 px-2 text-xl outline-none"
                placeholder="example@mail.com"
              />
            </label>
            <label htmlFor="password" className="flex flex-col border-b mb-5">
              Password:{" "}
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className=" py-1 px-2 text-xl outline-none"
                  placeholder="password"
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
