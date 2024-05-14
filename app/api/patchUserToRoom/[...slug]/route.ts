import { Room, User } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";
import { serverPusher } from "@/pusher";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    const userData: Partial<User> = await request.json();

    const roomRes = await redis.hget(`room:${slug}`, slug);

    if (!roomRes) {
      throw new Error("Room not found");
    }

    const room: Room = JSON.parse(roomRes);
    const userExists = room.users.find(({ id }) => id === userData.id);

    if (!userExists) {
      room.users.push(userData as User);

      await serverPusher.trigger(slug, "new-user", room),
        await redis.hset(`room:${slug}`, slug, JSON.stringify(room));
    }

    return NextResponse.json({ room });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
