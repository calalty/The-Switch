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
    const { isActive, id } = await request.json();

    const roomRes = await redis.hget(`room:${slug}`, slug);

    if (!roomRes) {
      throw new Error("Room not found");
    }

    const room: Room = JSON.parse(roomRes);

    const updatedRoom: Room = {
      ...room,
      users: room.users.map((user) => ({
        ...user,
        isActive: user.id === id ? isActive : user.isActive,
      })),
    };

    await serverPusher.trigger(slug, "switch", updatedRoom);
    await redis.hset(`room:${slug}`, slug, JSON.stringify(updatedRoom));

    return NextResponse.json({ room: updatedRoom });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
