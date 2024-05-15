"use client";

import { Session } from "next-auth";
import Link from "next/link";
import React from "react";
import {
  ArrowLeftEndOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";

type HeaderProps = {
  session: Session | null;
};
export const Header = async ({ session }: HeaderProps) => {
  return (
    <header className="flex flex-row px-5 py-2 bg-[#32cd32] border-b-1 border-gray-200 shadow-md justify-between items-center text-white">
      <Link href="/" className="text-2xl">
        The Sw
        <span className="text-xl -mr-1 font-black">⏻</span> tch
      </Link>

      <div className="flex flex-row items-center gap-4">
        {session && (
          <div className="flex items-center gap-2">
            <UserIcon className="h-6 w-6" />
            <p className="text-2xl font-black">{session.user?.name}</p>

            <ArrowLeftEndOnRectangleIcon
              onClick={() => signOut()}
              className="h-6 w-6 cursor-pointer"
            />
          </div>
        )}
      </div>
    </header>
  );
};
