import { NextRequest, NextResponse } from "next/server";
import { serverPusher } from "@/pusher";
import redis from "@/redis";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  try {
    await serverPusher.trigger(slug, "remove-room", null);
    await redis.del(`room:${slug}`);
    return NextResponse.json(null);
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
