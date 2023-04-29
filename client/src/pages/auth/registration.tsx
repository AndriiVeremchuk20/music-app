import React, { useCallback, useState } from "react";
import AuthWihtGoogle from "@/components/AuthWithGoogleButton";
import Head from "next/head";
import { BiShowAlt, BiHide } from "react-icons/bi";
import Link from "next/link";
import AppRoutes from "@/AppRoutes";
import { StringLiteral } from "typescript";
import { useForm } from "react-hook-form";

interface RegistrationInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repPasword: string;
}

const Registration = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<RegistrationInputs>();

  const onChangeVisiblyPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>
      <div className="w-full h-screen flex bg-gradient-to-r from-indigo-500 from-20% via-sky-500 via-50% to-emerald-500 to-90%">
        <div className="m-auto bg-white p-3 rounded-sm">
          <form className="flex flex-col mb-5" onSubmit={onSubmit}>
            <div className="text-2xl text-center mb-5">Registration</div>
            <label htmlFor="f-name" className="flex flex-col border-b mb-5">
              First name:
              <input
                type="text"
                id="f-name"
                className=" py-1 px-2 text-xl outline-none"
                placeholder="Margot"
                {...register("firstName", { required: true })}
              />
            </label>
            <label htmlFor="l-name" className="flex flex-col border-b mb-5">
              Last name:
              <input
                type="text"
                id="l-name"
                className=" py-1 px-2 text-xl outline-none"
                placeholder="Robbie"
                {...register("lastName", { required: true })}
              />
            </label>
            <label htmlFor="email" className="flex flex-col border-b mb-5">
              Email:
              <input
                type="email"
                id="email"
                className=" py-1 px-2 text-xl outline-none"
                placeholder="example@mail.com"
                {...register("email", { required: true })}
              />
            </label>
            <label htmlFor="password" className="flex flex-col border-b mb-5">
              Password:
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className=" py-1 px-2 text-xl outline-none"
                  placeholder="password"
                  {...register("password", { required: true })}
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
              className="flex flex-col border-b mb-5"
            >
              Repeat password:
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="rep-password"
                  className=" py-1 px-2 text-xl outline-none"
                  placeholder="Repeat password"
                  {...register("repPasword", { required: true })}
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
