import { Session } from "next-auth";
import React from "react";

type HeaderProps = {
  session: Session | null;
};
export const Header = async ({ session }: HeaderProps) => {
  return (
    <header className="flex flex-row px-5 py-2 bg-[#32cd32] border-b-1 border-gray-200 shadow-md justify-between items-center text-white">
      <p className="text-2xl">
        The Sw
        <span className="text-xl -mr-1 font-black">⏻</span> tch
      </p>

      <div className="flex flex-row items-center gap-4">
        {session && (
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 448 512"
              fill="white"
              height="1rem"
              width="1rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
            </svg>
            <p className="text-2xl font-black">{session.user?.name}</p>
          </div>
        )}
      </div>
    </header>
  );
};
