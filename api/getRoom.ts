import { Room } from "@/typings";

export const getRoom = async (slug: string) => {
    const res = await fetch(`/api/getRoom/${slug}`);
    const data = await res.json();
    const room: Room = data;
  
    return room;
  };
  