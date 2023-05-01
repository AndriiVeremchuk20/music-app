import { userAtom } from "@/atom";
import { getAuth, signOut } from "firebase/auth";
import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { RiLogoutBoxRFill } from "react-icons/ri";

export const LogOutButton = () => {
  const auth = getAuth();
  const [, setUser] = useAtom(userAtom);

  const onButtonClick = useCallback(async () => {
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <button
      className="flex border px-3 py-2 rounded-md hover:opacity-70 text-neutral-200"
      onClick={onButtonClick}
    >
      Logout <RiLogoutBoxRFill className="text-2xl mx-1" />
    </button>
  );
};
