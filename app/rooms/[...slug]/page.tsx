import { getRoom } from "@/api/getRoom";
import { Providers } from "@/app/providers";
import { Header } from "@/components/Header";
import { Room } from "@/components/Room";
import { getServerSession } from "next-auth";

export default async function RoomPage({
  params: {slug},
}: {
  params: { slug: string };
}) {
  const session = await getServerSession();

  const room = await getRoom(slug[0])

  return (
    <Providers session={session}>
      <Header session={session} />
      <Room initialRoom={room} slug={slug} />
    </Providers>
  );
}
