import { Room, User } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { isActive, id } = await request.json();

  const roomRes = await redis.hget("room", params?.slug);

  const room: Room = JSON.parse(roomRes);

  if (!roomRes) {
    return new Error("Room not found");
  }

  room.users.forEach((user) => {
    if (user.id === id) {
      user.isActive = isActive;
    }
  });

  await redis.hset("room", params?.slug, JSON.stringify(room));

  return NextResponse.json({ room });
}
