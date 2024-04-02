import { FormEvent, useState } from "react";
import { Button } from "./Button";
import { useSession } from "next-auth/react";
import { Room, User } from "@/typings";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
export const CreateRoomForm = () => {
  const [input, setInput] = useState<string>("");
  const session = useSession();
  const router = useRouter();

  const createRoom = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    const userId = uuid();
    const roomId = uuid();

    const user: User = {
      id: userId,
      isActive: false,
      name: session.data?.user?.name ?? "",
    };

    const room: Room = {
      id: roomId,
      name: input,
      created_at: Date.now(),
      users: [user],
    };

    try {
      const data = await fetch("/api/createRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          room,
        }),
      }).then((res) => res.json());

      router.push(`/rooms/${data.room.id}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <form onSubmit={createRoom} className="flex flex-col gap-4">
      <div className="flex items-center relative">
        <input
          type="checkbox"
          className="h-4 w-4 appearance-none border border-gray-300 rounded-md checked:bg-[#32cd32] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-[#32cd32] focus:ring-offset-2"
        />
        <label className="ml-3 text-sm text-gray-[#3e424850]">
          Permanent Room
        </label>

        <svg
          className="h-3 w-3 text-white fill-current absolute left-[2px]"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>

      <input
        onChange={(e) => setInput(e.target.value)}
        className="text-lg px-5 py-2 rounded-md border border-[#3e424850] text-[#3e4248] font-mono"
        type="text"
        placeholder="Enter room name"
      />

      <Button text="Start switching!" />
    </form>
  );
};
