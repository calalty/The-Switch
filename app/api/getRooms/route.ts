import redis from "@/redis";
import { Room } from "@/typings";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest): Promise<void | Response> {
  try {
    const roomsRes = await redis.get("rooms");

    const rooms = JSON.parse(roomsRes ?? "");
    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
