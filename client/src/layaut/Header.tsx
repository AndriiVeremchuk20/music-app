import React from "react";
import { userAtom } from "@/atom";
import { useAtom } from "jotai";
import { FaUserCircle } from "react-icons/fa";
import { LogOutButton } from "@/components/LogOutButton";
import Link from "next/link";
import AppRoutes from "@/AppRoutes";
import { Logo } from "@/components/Logo";

export const Header = () => {
  const [user] = useAtom(userAtom);
  return (
    <div className="w-full h-24 px-10 bg-neutral-600 bg-opacity-80 fixed border-b">
      <div className="flex justify-between">
        <Logo />

        <div className="my-auto">Search bar</div>

        <div className="my-6">
          {user ? (
            <div className="flex">
              <Link href={"/"}>
                {user.avatarPath ? (
                  <div>Avatar blt</div>
                ) : (
                  <FaUserCircle className="text-5xl" />
                )}
              </Link>
              {/* <LogOutButton /> */}
            </div>
          ) : (
            <div className="flex text-xl my-auto">
              <Link
                className="underline text-indigo-900 hover:no-underline"
                href={AppRoutes.auth.login}
              >
                Login
              </Link>
              /
              <Link
                className="underline text-indigo-900 hover:no-underline"
                href={AppRoutes.auth.login}
              >
                Registration
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
