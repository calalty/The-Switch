import { FormEvent, useEffect, useState } from "react";
import { Button } from "./Button";
import { useSession } from "next-auth/react";
import { Room, User } from "@/typings";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { createRoom } from "@/api/createRoom";

export const CreateRoomForm = () => {
  const [input, setInput] = useState<string>("");
  const session = useSession();
  const router = useRouter();
  const [isCreateRoomError, setIsCreateRoomError] = useState(false);
  const [roomName, setIsRoomName] = useState<string>();
  const roomId = uuid();

  const user: User = {
    id: session.data?.user?.id,
    isActive: false,
    name: session.data?.user?.name ?? "",
  };

  const room: Room = {
    id: roomId,
    name: input,
    created_at: Date.now(),
    users: [user],
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input || !session) return;

    try {
      await createRoom({ room });
      router.push(`/rooms/${room.name}`);
    } catch (error) {
      setIsRoomName(room.name);
      setIsCreateRoomError(true);
    }
  };

  useEffect(() => {
    setIsCreateRoomError(input === roomName);
  }, [input, roomName]);

  return (
    <>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setInput(e.target.value)}
          className="text-lg px-5 py-2 rounded-md border border-[#3e424850] text-[#3e4248] font-mono"
          type="text"
          placeholder="Enter room name"
        />

        <Button disabled={isCreateRoomError} text="Start switching!" />
      </form>

      {isCreateRoomError && (
        <p className="text-red-600">This room already exists...</p>
      )}
    </>
  );
};
