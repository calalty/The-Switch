import { Session } from "next-auth";

type Payload = {
  isActive: boolean;
  id?: string | null;
};

export const patchUserSwitch = async (slug: string, payload: Payload) => {
  const { id, isActive } = payload;

  try {
    await fetch(`/api/patchUserSwitch/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        isActive,
      }),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error with the switch:", error);
  }
};
