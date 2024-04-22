'use client'

import { Room as RoomType } from "@/typings";
import { useEffect, useState } from "react";
import { Switch } from "./Switch";
import { PersonTile } from "./PersonTile";
import { clientPusher } from "@/pusher";

type Props = {
  initialRoom: RoomType;
  slug: string;
};

export const Room = ({ initialRoom, slug }: Props) => {
  const [room, setRoom] = useState(initialRoom);
  const roomId = slug[0];

  useEffect(() => {
    const handleRoom = (newRoom) => {
      setRoom(newRoom);
    };

    clientPusher.subscribe(roomId);
    clientPusher.bind("switch", handleRoom);
    clientPusher.bind("new-user", handleRoom);

    return () => {
      clientPusher.unsubscribe(roomId);
      clientPusher.unbind("switch", handleRoom);
      clientPusher.unbind("new-user", handleRoom);
    };
  }, [roomId]);

  return (
    <div className="flex">
      <section className="w-full flex min-h-screen flex-col text-5xl items-center mt-8 text-center leading-6 gap-4">
        <h1 className="w-full tracking-wide text-[#3e4248]">{room?.name}</h1>
        <div className="flex flex-col justify-center min-h-screen">
          <Switch room={room} />
        </div>
      </section>

      <PersonTile users={room?.users} />
    </div>
  );
};
