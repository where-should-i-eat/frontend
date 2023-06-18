import React from "react";
import { FC } from "react";
import Link from "next/link";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[50px] sm:h-[60px] border-b border-neutral-300 py-2 px-2 sm:px-8 items-center justify-between">
      <div className="font-bold text-3xl flex items-center">
        <Link className="ml-2 hover:opacity-50" href="/">
          Where Should I Eat?
        </Link>
      </div>
    </div>
  );
};
