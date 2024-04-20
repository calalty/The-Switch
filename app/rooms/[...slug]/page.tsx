import { Providers } from "@/app/providers";
import { Header } from "@/components/Header";
import { Room } from "@/components/Room";
import { getServerSession } from "next-auth";

export default async function RoomPage() {
  const session = await getServerSession()

  return (
    <Providers session={session}>
      <Header session={session} />

        <Room />
      </Providers>
  );
}
