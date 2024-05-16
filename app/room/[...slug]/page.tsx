import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Room } from "@/components/Room";
import { getRoom, removeUserFromRoom } from "@/instance";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RoomPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const session = await getServerSession(authOptions);
  const room = await getRoom(slug);

  if (!session) {
    redirect("/");
  }

  return <Room initialRoom={room} session={session} slug={slug} />;
}
