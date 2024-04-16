export const deleteUserFromRoom = async (id: string) => {
  try {
    await fetch(`/api/deleteUserFromRoom`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
