import { Providers } from "@/app/providers";
import { Header } from "@/components/Header";
import {Switch} from "@/components/Switch";
import { Room as RoomProps } from "@/typings";
import { getServerSession } from "next-auth";

export default async function Room({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const session = await getServerSession();

  const room: RoomProps = await fetch(
    `${process.env.APP_URL}/api/getRoom/${slug}`,
    { cache: "no-store" }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch room. Status: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Error fetching room:", error);
    });

  return (
    <>
      <Header session={session} />
      <section className="flex min-h-screen flex-col text-5xl items-center mt-8 text-center leading-6 gap-4">
        <h1 className="w-full tracking-wide text-[#3e4248]">{room?.name}</h1>

        <div className="flex flex-col justify-center min-h-screen">
        <Providers session={session}>
            <Switch slug={slug} />
            </Providers>
        </div>
      </section>
    </>
  );
}
