import { Room } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";
import { handleRequest } from "@/server-instance";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
): Promise<void | Response> {
  return handleRequest(async () => {
    const roomRes = await redis.hget(`room:${slug}`, slug);

    if (!roomRes) {
      throw new Error("Room not found");
    }

    const room: Room = JSON.parse(roomRes);
    return NextResponse.json(room);
  });
}
