import { Room } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
): Promise<void | Response> {
  try {
    const roomRes = await redis.hget(`room:${slug}`, slug);

    if (!roomRes) {
      throw new Error("Room not found");
    }

    const room: Room = JSON.parse(roomRes);
    return NextResponse.json(room);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
