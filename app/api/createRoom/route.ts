import { Room } from "@/typings";
import redis from "../../../redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { room } = await request.json();

  const newRoom: Room = {
    ...room,
    created_at: Date.now()
  };

  await redis.hset(`room:${room.name}`, room.name, JSON.stringify(newRoom));

  return NextResponse.json({ room: newRoom });
}
