import { Room, User } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const userData: Partial<User> = await request.json();

  const roomRes = await redis.hget("room", params?.slug);

  if (!roomRes) {
    return new Error("Room not found");
  }

  const room: Room = JSON.parse(roomRes);
  const userExists = room.users.find(({ id }) => id === userData.id);

  if (!userExists) {
    room.users.push(userData as User);
  }

  await redis.hset("room", params?.slug, JSON.stringify(room));

  return NextResponse.json({ room });
}
