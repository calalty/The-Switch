import { Room, User } from "@/typings";
import redis from "../../../../redis";

import { NextRequest, NextResponse } from "next/server";
import { serverPusher } from "@/pusher";

export const dynamic = "force-dynamic";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const userData: Partial<User> = await request.json();

    const roomRes = await redis.hget(
      `room:${params?.slug[0]}`,
      params?.slug[0]
    );

    if (!roomRes) {
      throw new Error("Room not found");
    }

    const room: Room = JSON.parse(roomRes);
    const userExists = room.users.find(({ id }) => id === userData.id);

    if (!userExists) {
      room.users.push(userData as User);

      await serverPusher.trigger(params?.slug[0], "new-user", room),
        await redis.hset(
          `room:${params?.slug[0]}`,
          params.slug[0],
          JSON.stringify(room)
        );
    }

    return NextResponse.json({ room });
  } catch (error) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
