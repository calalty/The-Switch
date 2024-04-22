import { Session } from "next-auth";

type Payload = {
  session: Session | null;
};

export const patchUserToRoom = async (slug: string, payload: Payload) => {
  const { session } = payload;

  try {
    await fetch(`/api/patchUserToRoom/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session?.user?.id,
        name: session?.user?.name,
        isActive: false
      }),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error joining room:", error);
  }
};
