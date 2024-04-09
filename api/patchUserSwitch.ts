import { Session } from "next-auth";

type Payload = {
  session: Session | null;
  isActive: boolean;
};

export const patchUserSwitch = async (slug: string, payload: Payload) => {
  const { session, isActive } = payload;

  try {
    await fetch(`/api/patchUserSwitch/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session?.user?.id,
        isActive: !isActive,
      }),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error joining room:", error);
  }
};
