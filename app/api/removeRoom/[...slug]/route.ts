import { NextRequest, NextResponse } from "next/server";
import { serverPusher } from "@/pusher";
import redis from "@/redis";
import { Room } from "@/typings";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    await serverPusher.trigger(slug, "remove-room", null);
    await redis.del(`room:${slug}`);

    const allRoomsString = await redis.get("rooms");
    let allRooms: Room[] = JSON.parse(allRoomsString!);
    const roomIndex = allRooms.findIndex(({ name }) => name === slug[0]);
    if (roomIndex !== -1) {
      allRooms.splice(roomIndex, 1);
    }

    await redis.set("rooms", JSON.stringify(allRooms));
    return NextResponse.json(null);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
