import { NextRequest } from "next/server";
import { serverPusher } from "@/pusher";
import redis from "@/redis";

export const dynamic = "force-dynamic";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  await serverPusher.trigger(params?.slug[0], "remove-room", null);
  await redis.del(`room:${params?.slug[0]}`);
}
