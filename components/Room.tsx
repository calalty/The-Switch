"use client";

import { Room as RoomType } from "@/typings";
import { useEffect, useState } from "react";
import { Switch } from "./Switch";
import { PersonTile } from "./PersonTile";
import { clientPusher } from "@/pusher";
import { useSession } from "next-auth/react";
import { removeRoom } from "@/api/removeRoom";
import { removeUserFromRoom } from "@/api/removeUserFromRoom";
import { useDetectInactiveUser } from "@/hooks/use-detect-inactive-user";
import { AwayModal } from "./AwayModal";

type Props = {
  initialRoom: RoomType;
  slug: string;
};

export const Room = ({ initialRoom, slug }: Props) => {
  const [room, setRoom] = useState(initialRoom);
  const roomId = slug[0];
  const isUserInactive = useDetectInactiveUser();
  const users = room?.users;
  const [isAwayModalOpen, setIsAwayModalOpen] = useState(false);
  const session = useSession();
  const user = session?.data?.user;
  const isUserInRoom = !users?.some(({ id }) => user?.id === id);

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

  useEffect(() => {
    if (isUserInactive) {
      removeUserFromRoom(roomId, user?.id!);
      const usersToRemove = users?.filter(({ id }) => id !== user?.id);
      usersToRemove?.forEach(({ id }) =>
        removeUserFromRoom(roomId, user?.id ?? id!)
      );
    }
  }, [isUserInactive, roomId, user?.id, users]);

  useEffect(() => {
    setIsAwayModalOpen(isUserInRoom);
  }, [isUserInRoom]);

  useEffect(() => {
    if (users && !users.length) removeRoom(roomId);
  }, [roomId, users, users?.length]);

  return (
    <div className="flex">
      {room && (
        <section className="w-full flex min-h-screen flex-col text-5xl items-center mt-8 text-center leading-6 gap-4">
          <h1 className="w-full tracking-wide text-[#3e4248]">{room?.name}</h1>
          <div className="flex flex-col justify-center min-h-screen">
            <Switch room={room} />
          </div>
        </section>
      )}

      <PersonTile users={room?.users} />
      {isAwayModalOpen && (
        <AwayModal
          text={!room ? "Room no longer exists!" : "Sorry, you were AFK!"}
        />
      )}
    </div>
  );
};
