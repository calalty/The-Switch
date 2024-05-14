'use client';

import { SignIn } from "@/components/SignInModal";
import { CreateRoom } from "./CreateRoom";
import { JoinRoom } from "./JoinRoom";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";

export default function SignInPage() {
  const { update, data: session } = useSession()

  useEffect(() => {
    if (session?.user?.id) return;

    update();
  }, [update, session?.user?.id]);

  return (
    <main className="flex min-h-fit flex-col text-5xl items-center mt-8 text-center leading-6 gap-y-10">
      <h1 className="w-full tracking-wide text-[#3e4248]">
        Welcome to <br />{" "}
        <p className="text-6xl leading-6 font-black tracking-wide text-[#32cd32]">
          The Sw
          <span className="text-5xl">⏻</span>
          tch
        </p>
      </h1>

      <div className="flex gap-4">
        <CreateRoom />
        <JoinRoom />
      </div>

      <Image
        src="/users.svg"
        alt="Users on a call"
        width={350}
        height={24}
        priority
      />

      <SignIn />
    </main >
  );
}
