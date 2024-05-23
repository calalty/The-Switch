"use client";

import { Session } from "next-auth";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import {
  ArrowLeftEndOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { getRooms, removeRoom, removeUserFromRoom } from "@/instance";

type HeaderProps = {
  session: Session | null;
};

export const Header = async ({ session }: HeaderProps) => {
  const hasFetchedRooms = useRef(false);

  useEffect(() => {
    if (hasFetchedRooms.current) return;

    const fetchAndRemoveUsers = async () => {
      const rooms = await getRooms();

      if (rooms) {
        for (const { users, name } of rooms) {
          const userToRemove = users.find(({ id }) => id !== session?.user?.id);

          if (userToRemove?.id && name) {
            await removeUserFromRoom(name, userToRemove.id);
          }

          if (users.length === 0) {
            await removeRoom(name);
          }
        }
      }
      hasFetchedRooms.current = true;
    };

    fetchAndRemoveUsers();
  }, [session?.user?.id]);

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
