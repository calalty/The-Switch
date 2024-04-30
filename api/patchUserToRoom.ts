import axios from "axios";
import { Session } from "next-auth";

type Payload = {
  session: Session | null;
};

export const patchUserToRoom = async (slug: string, payload: Payload) => {
  const { session } = payload;

  const { data } = await axios.patch(
    `/api/patchUserToRoom/${slug}`,
    {
      id: session?.user?.id,
      name: session?.user?.name,
      isActive: false,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
