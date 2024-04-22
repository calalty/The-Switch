import { Room, User } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";
import { serverPusher } from "@/pusher";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { isActive, id } = await request.json();

  const roomRes = await redis.hget(`room:${params?.slug[0]}`, params?.slug[0]);

  if (!roomRes) {
    return NextResponse.error();
  }

  const room: Room = JSON.parse(roomRes);

  const updatedRoom: Room = {
    ...room,
    users: room.users.map((user) => ({
      ...user,
      isActive: user.id === id ? isActive : user.isActive,
    })),
  };

  await serverPusher.trigger(params?.slug[0], "switch", updatedRoom);
  await redis.hset(`room:${params?.slug[0]}`, params?.slug[0], JSON.stringify(updatedRoom));

  return NextResponse.json({ room: updatedRoom });
}
