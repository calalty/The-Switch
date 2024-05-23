import { Room } from "@/typings";
import redis from "../../../redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<void | Response> {
  try {
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
    const allRoomsString = await redis.get("rooms");
    let allRooms: Room[] = allRoomsString ? JSON.parse(allRoomsString) : [];
    allRooms.push(newRoom);
    await redis.set("rooms", JSON.stringify(allRooms));

    return NextResponse.json({ room: newRoom });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
