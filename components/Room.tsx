"use client";

import { getRoom } from "@/api/getRoom";
import { clientPusher } from "@/pusher";
import { Room as RoomType } from "@/typings";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { Switch } from "./Switch";
import { PersonTile } from "./PersonTile";

export const Room = () => {
  const { slug } = useParams();

  const getRoom = useCallback(async () => {
    const res = await fetch(`/api/getRoom/${slug[0]}`);
    const data = await res.json();
    const room: RoomType = data;

    return room;
  }, [slug]);

  const { data: room, mutate } = useSWR<RoomType>(
    `/api/getRoom/${slug}`,
    getRoom
  );

  console.log(room);

  useEffect(() => {
    const channel = clientPusher.subscribe("room");

    channel.bind("new-user", async (data: RoomType) => {
      if (room?.users.find(({ id }) => id === data.id)) return;

      if (!room) {
        mutate(getRoom);
      } else {
        mutate(getRoom, {
          optimisticData: { ...data, ...room! },
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [room, mutate, slug, getRoom]);

  return (
    <div className="flex">
      <section className=" w-full flex min-h-screen flex-col text-5xl items-center mt-8 text-center leading-6 gap-4">
        <h1 className="w-full tracking-wide text-[#3e4248]">{room?.name}</h1>

        <div className="flex flex-col justify-center min-h-screen">
          <Switch room={room} slug={slug[0]} />
        </div>
      </section>

      <PersonTile users={room?.users} />
    </div>
  );
};
