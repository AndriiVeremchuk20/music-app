import Link from "next/link";
import Image from "next/image";
import React from "react";
import AppRoutes from "@/AppRoutes";

export const Logo = () => {
  return (
    <div className="h-[80px] mt-2">
      <Link href={AppRoutes.home}>
        <div className="flex">
          <Image className="overflow-visible z-10" src="/Logo.png" alt="Logo" width={80} height={80} />
          <div className="my-auto px-4 relative left-[-15px] bg-neutral-900 shadow-inner shadow-indigo-800 text-indigo-500 py-3 rounded-r-full text-2xl font-bold">Ding Dong</div>
        </div>
      </Link>
    </div>
  );
};
