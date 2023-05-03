import AppRoutes from "@/AppRoutes";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { LogOutButton } from "./LogOutButton";

interface PropMenu {
  show: boolean;
  hide: () => void;
}

export const Menu: React.FC<PropMenu> = ({ show, hide }) => {
  if (show)
    return (
      <div className="w-full h-screen bg-amber-500 bg-opacity-60 z-20 fixed flex" onClick={hide}>
        <div className="absolute right-24 top-28 text-5xl">
          <AiOutlineClose onClick={hide} />
        </div>
        <div className="mt-96 mx-auto flex flex-col">
          <Link href={AppRoutes.home} className="underline text-3xl text-white hover:text-opacity-50">Home</Link>
          <Link href={AppRoutes.profile.index} className="underline text-3xl text-white hover:text-opacity-50">Profile</Link>
          <Link href={AppRoutes.music.add} className="underline text-3xl text-white hover:text-opacity-50">Add sound</Link>
          <LogOutButton/>
        </div>
      </div>
    );

  return null;
};
