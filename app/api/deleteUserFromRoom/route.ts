import { Room, User } from "@/typings";
import redis from "../../../redis";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  if (!id) {
    return new Error("User not found");
  }

  const roomRes = await redis.hget("room", id);

  if (!roomRes) {
    return new Error("Room not found");
  }

  const room: Room = JSON.parse(roomRes);
  room.users = room.users.filter((user: User) => user.id !== id);

  await redis.hset("room", id, JSON.stringify(room));

  return NextResponse.json({ room });
}
