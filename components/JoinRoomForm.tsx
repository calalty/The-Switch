import { FormEvent, useState } from "react";
import { Button } from "./Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { patchUserToRoom } from "@/api/patchUserToRoom";

export const JoinRoomForm = () => {
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   await patchUserToRoom(input, {session}).then(() => router.push(`/room/${input}`))
  };

  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
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
