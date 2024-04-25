"use client";

import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export const AwayModal = ({ text }: { text: string }) => {
  const router = useRouter();

  return (
    <div className="bg-[#000c] bottom-0 flex flex-col left-0 fixed right-0 top-0 z-[999]">
      <div className="flex w-full h-full flex-col justify-center">
        <div className="flex gap-3 bg-[#32cd32] text-white flex-shrink-0 items-center justify-center p-6 text-shad w-full">
          <ArrowLeftEndOnRectangleIcon
            onClick={() => router.push("/")}
            className="h-10 w-10 cursor-pointer"
          />
          <h2 className="tracking-wide text-3xl">{text}</h2>
        </div>
      </div>
    </div>
  );
};
