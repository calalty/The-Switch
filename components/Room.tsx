"use client";

import { Room as RoomType } from "@/typings";
import { useEffect, useState } from "react";
import { Switch } from "./Switch";
import { UsersTile } from "./UsersTile";
import { clientPusher } from "@/pusher";
import { AwayModal } from "./AwayModal";
import { Session } from "next-auth";

type Props = {
  initialRoom: RoomType;
  slug: string;
  session: Session | null;
};

export const Room = ({ initialRoom, slug, session }: Props) => {
  const [room, setRoom] = useState(initialRoom);
  const roomId = slug[0];
  const roomUsers = room?.users;
  const user = session?.user;

  const isUserInRoom = roomUsers?.some(({ id }) => user?.id === id);
  const isNoUsers = !roomUsers || !room.users.length;

  useEffect(() => {
    const handleRoom = (newRoom: RoomType) => {
      setRoom(newRoom);
    };

    clientPusher.subscribe(roomId);
    clientPusher.bind("remove-room", handleRoom);
    clientPusher.bind("switch", handleRoom);
    clientPusher.bind("remove-user", handleRoom);
    clientPusher.bind("new-user", handleRoom);

    return () => {
      clientPusher.unsubscribe(roomId);
      clientPusher.unbind("remove-room", handleRoom);
      clientPusher.unbind("remove-user", handleRoom);
      clientPusher.unbind("switch", handleRoom);
      clientPusher.unbind("new-user", handleRoom);
    };
  }, [roomId]);

  return (
    <div className="flex flex-col sm:flex-row">
      {room && !isNoUsers && (
        <section className="w-full flex min-h-fit flex-col text-5xl items-center mt-8 text-center leading-6 gap-8">
          <h1 className="w-full tracking-wide text-[#3e4248] px-4">
            {room?.name}
          </h1>
          <div className="flex flex-col justify-center gap-6 mt-12">
            <Switch slug={slug} session={session} room={room} />
          </div>
        </section>
      )}

      <UsersTile users={room?.users} />
      {!isUserInRoom && (
        <AwayModal
          text={
            isNoUsers ? "Sorry, room no longer exists!" : "Sorry, you were AFK!"
          }
        />
      )}
    </div>
  );
};
