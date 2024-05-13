import { Room } from "@/typings";
import redis from "../../../redis";
import { NextRequest, NextResponse } from "next/server";
import { handleRequest } from "@/server-instance";

export async function POST(request: NextRequest): Promise<void | Response> {
  return handleRequest(async () => {
    const room = await request.json();

    const roomExists = await redis.hget(`room:${room.name}`, room.name);

    const newRoom: Room = {
      ...room,
      created_at: Date.now(),
    };

    if (roomExists) {
      throw new Error("Room already exists!");
    }

    await redis.hset(`room:${room.name}`, room.name, JSON.stringify(newRoom));

    return NextResponse.json({ room: newRoom });
  });
}
