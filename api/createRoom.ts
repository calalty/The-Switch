import axios from "axios";
import { AxiosApiResponse, Room } from "@/typings";

type Payload = {
  room: Room;
};

export const createRoom = async (
  payload: Payload
): Promise<AxiosApiResponse> => {
  const { room } = payload;

  const { data } = await axios.post(
    "/api/createRoom",
    {
      room,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
