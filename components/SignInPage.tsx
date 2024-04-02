import { SignIn } from "@/components/SignInModal";
import { CreateRoom } from "./CreateRoom";
import { JoinRoom } from "./JoinRoom";
export default async function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col text-5xl items-center mt-8 text-center leading-6 gap-4">
      <h1 className="w-full tracking-wide text-[#3e4248]">
        Welcome to <br />{" "}
        <p className="text-6xl leading-6 font-black tracking-wide text-[#32cd32]">
          The Sw
          <span className="text-5xl">⏻</span>
          tch
        </p>
      </h1>

      <p className="text-2xl text-[#3e4248]">110 players online</p>

      <div className="flex gap-4">
        <CreateRoom />
        <JoinRoom />
      </div>

      <SignIn />
    </main>
  );
}
