import React from "react";
import { Navbar } from "./Navbar";
import { userAtom } from "@/atom";
import { useAtom } from "jotai";
import { FaUserCircle } from "react-icons/fa";
import { LogOutButton } from "@/components/LogOutButton";
import Link from "next/link";
import AppRoutes from "@/AppRoutes";

export const Header = () => {
  const [user] = useAtom(userAtom);
  return (
    <div className="w-full h-16 px-10 bg-neutral-600 bg-opacity-60 fixed border-b">
      <div className="flex justify-between">
       <div>
          {
            user?<LogOutButton />:<div className="flex text-xl">
              <Link className="underline text-indigo-500 hover:no-underline" href={AppRoutes.auth.login}>Login</Link>/
              <Link className="underline text-indigo-500 hover:no-underline" href={AppRoutes.auth.login}>Registration</Link>
            </div> 
          }
        </div>
      </div>
      <Navbar />
    </div>
  );
};
