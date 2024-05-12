import { NextRequest } from "next/server";
import { serverPusher } from "@/pusher";
import redis from "@/redis";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: NextRequest,
  { params: { slug } }: { params: { slug: string } }
) {
  await serverPusher.trigger(slug, "remove-room", null);
  await redis.del(`room:${slug}`);
}
