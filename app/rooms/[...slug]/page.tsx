import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Providers } from "@/app/providers";
import { Header } from "@/components/Header";
import { Room } from "@/components/Room";
import { getRoom } from "@/instance";
import { getServerSession } from "next-auth";

export default async function RoomPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);

  const room = await getRoom(slug);

  return (
    <Providers session={session}>
      <Header session={session} />
      <Room initialRoom={room} session={session} slug={slug} />
    </Providers>
  );
}
