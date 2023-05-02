import React, { useCallback, useState } from "react";
import { userAtom } from "@/atom";
import { useAtom } from "jotai";
import { FaUserCircle } from "react-icons/fa";
import { LogOutButton } from "@/components/LogOutButton";
import Link from "next/link";
import AppRoutes from "@/AppRoutes";
import { Logo } from "@/components/Logo";
import { Menu } from "@/components/Menu";

export const Header = () => {
  const [user] = useAtom(userAtom);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = useCallback(() => {
    setShowMenu(true);
  }, []);

  const handleHideMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  return (
    <>
      <Menu hide={handleHideMenu} show={showMenu} />
      <div className="w-full h-24 px-4 bg-neutral-600 bg-opacity-80 fixed border-b">
        <div className="flex justify-between">
          <Logo />
          <div className="my-auto">Search bar</div>

          <div className="my-6">
            {user ? (
              <div className="flex" onClick={handleShowMenu}>
                {user.avatarPath ? (
                  <div>Avatar blt</div>
                ) : (
                  <>
                    <div className="my-auto px-4">{user.firstName}</div>
                    <FaUserCircle className="text-5xl" />
                  </>
                )}
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
    </>
  );
};
