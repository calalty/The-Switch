import { Room } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";
import { serverPusher } from "@/pusher";
import { handleRequest } from "@/server-instance";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  return handleRequest(async () => {
    const id = await request.json();

    const roomRes = await redis.hget(`room:${slug}`, slug);

    if (!roomRes) {
      throw new Error("Room not found");
    }

    const room: Room = JSON.parse(roomRes);

    const updatedUsers = room.users.filter((userId) => userId.id !== id);
    const updatedRoom = { ...room, users: updatedUsers };

    await serverPusher.trigger(slug, "remove-user", updatedRoom);
    await redis.hset(`room:${slug}`, slug, JSON.stringify(updatedRoom));

    return NextResponse.json({ room: updatedRoom });
  });
}
