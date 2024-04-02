import { Button } from "./Button";

export const JoinRoomForm = () => {
  return (
    <form className="flex flex-col gap-4">
      <input
        className="text-lg px-5 py-2 rounded-md border border-[#3e424850] text-[#3e4248] font-mono"
        type="text"
        placeholder="Enter room name"
      />

      <Button text="Start switching!" />
    </form>
  );
};
