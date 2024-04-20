import { Room } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const {id} = await request.json();

    if (!id) {
      throw new Error("User id not provided");
    }

    const roomRes = await redis.hget("room", params?.slug);

    if (!roomRes) {
      throw new Error("Room not found");
    }

    const room: Room = JSON.parse(roomRes);

    const updatedUsers = room.users.filter(userId => userId.id !== id);
    const updatedRoom = { ...room, users: updatedUsers };

    await redis.hset("room", params?.slug, JSON.stringify(updatedRoom));

    return NextResponse.json({room: updatedRoom});
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.error();
  }
}
