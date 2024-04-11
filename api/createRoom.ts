import { Room } from "@/typings";

type Payload = {
  room: Room;
};

export const createRoom = async (payload: Payload) => {
  const { room } = payload;

  try {
    await fetch("/api/createRoom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room,
      }),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error creating room:", error);
  }
};
