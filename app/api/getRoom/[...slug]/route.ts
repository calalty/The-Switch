import { Room } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const roomRes = await redis.hget("room", params?.slug);

  if (!roomRes) {
    return new Error("Room not found");
  }

  const room: Room = JSON.parse(roomRes);

  return NextResponse.json(room);
}
