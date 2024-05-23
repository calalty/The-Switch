import { Room } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";
import { serverPusher } from "@/pusher";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const id = await request.json();

    const roomRes = await redis.hget(`room:${slug}`, slug);

    if (!roomRes) {
      throw new Error("Room not found");
    }

    const room: Room = JSON.parse(roomRes);

    const updatedUsers = room.users.filter((user) => user.id !== id);
    const updatedRoom = { ...room, users: updatedUsers };

    await serverPusher.trigger(slug, "remove-user", updatedRoom);
    await redis.hset(`room:${slug}`, slug, JSON.stringify(updatedRoom));

    const allRoomsString = await redis.get("rooms");
    const allRooms: Room[] = JSON.parse(allRoomsString!);

    allRooms.forEach(({ users }) => {
      if (users && users.length > 0) {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
        }
      }
    });

    await redis.set("rooms", JSON.stringify(allRooms));

    return NextResponse.json({ room: updatedRoom });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
