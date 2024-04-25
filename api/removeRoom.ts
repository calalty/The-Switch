export const removeRoom = async (slug: string) => {
  try {
    await fetch(`/api/removeRoom/${slug}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error deleting the room:", error);
  }
};
