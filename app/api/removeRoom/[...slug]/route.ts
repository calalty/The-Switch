import { NextRequest, NextResponse } from "next/server";
import { serverPusher } from "@/pusher";
import redis from "@/redis";
import { handleRequest } from "@/server-instance";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  return handleRequest(async () => {
    await serverPusher.trigger(slug, "remove-room", null);
    await redis.del(`room:${slug}`);
    return NextResponse.json(null);
  });
}
