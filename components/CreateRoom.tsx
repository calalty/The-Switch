"use client";

import { useState } from "react";
import { Button } from "./Button";
import { CreateRoomForm } from "./CreateRoomForm";
import { XMarkIcon } from "@heroicons/react/24/solid";
export const CreateRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen && (
        <div className="bg-[#000c] bottom-0 flex flex-col left-0 fixed right-0 top-0 z-[999] text-2xl text-white">
          <div className="flex w-full h-fit m-auto max-w-96 flex-col justify-center">
            <div className="w-full bg-[#32cd32] rounded-md rounded-bl-none rounded-br-none px-5 py-2 flex justify-between items-center">
              <p>Create Room</p>
              <button onClick={() => setIsModalOpen(false)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="font-mono flex flex-col gap-5 bg-white flex-shrink-0 justify-center p-6 text-[#3e4248] rounded-md rounded-tl-none rounded-tr-none text-base">
              <CreateRoomForm />
            </div>
          </div>
        </div>
      )}

      <Button text="Create Room" onClick={() => setIsModalOpen(true)} />
    </>
  );
};
