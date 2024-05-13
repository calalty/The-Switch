export const handleRequest = async (
  callback: () => Promise<Response>
): Promise<Response> => {
  try {
    return await callback();
  } catch (error) {
    console.error("Internal Server Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
