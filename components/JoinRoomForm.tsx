import { FormEvent, useEffect, useState } from "react";
import { Button } from "./Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { patchUserToRoom } from "@/instance";

export const JoinRoomForm = () => {
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();
  const [isJoinRoomError, setIsJoinRoomError] = useState(false);
  const [roomName, setIsRoomName] = useState<string>();
  const router = useRouter();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (session) {
      try {
        await patchUserToRoom(input, session);
        router.push(`/room/${input}`);
      } catch (error) {
        setIsRoomName(input);
        setIsJoinRoomError(true);
      }
    }
  };

  useEffect(() => {
    setIsJoinRoomError(input === roomName);
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

        <Button text="Start switching!" />
      </form>

      {isJoinRoomError && (
        <p className="text-red-600">This room does not exist...</p>
      )}
    </>
  );
};
