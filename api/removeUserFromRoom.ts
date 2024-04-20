export const removeUserFromRoom = async (slug: string, id: string) => {
  try {
    await fetch(`/api/removeUserFromRoom/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id.toString(),
      }),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
