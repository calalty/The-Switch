"use client";

import { signIn, useSession } from "next-auth/react";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "./Button";

export const SignIn = () => {
  const session = useSession();
  const [nickname, setNickname] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
    await signIn("credentials", { nickname });
  };

  useEffect(() => {
    if (!session.data) {
      setIsModalOpen(true);
    }
  }, [session]);

  return (
    <>
      {isModalOpen && (
        <div className="bg-[#000c] bottom-0 flex flex-col left-0 fixed right-0 top-0 z-[999]">
          <div className="flex w-full h-full flex-col justify-center">
            <div className="flex flex-col gap-5 bg-[#3e4248] text-white flex-shrink-0 justify-center p-6 text-shad">
              <h1 className="w-full tracking-wide">
                Welcome to <br />{" "}
                <p className="text-6xl leading-6 font-black tracking-wide">
                  The Sw
                  <span className="text-5xl text-[#32cd32]">⏻</span>
                  tch
                </p>
              </h1>

              <form onSubmit={handleOnSubmit}>
                <div className="flex justify-center items-center">
                  <input
                    className="text-lg px-5 py-2 rounded-md rounded-tr-none rounded-br-none text-gray-800 font-mono"
                    type="text"
                    placeholder="Enter your nickname"
                    value={nickname}
                    onChange={handleNicknameChange}
                  />
                  <Button
                    isRounded={false}
                    disabled={!nickname}
                    text="Submit"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
