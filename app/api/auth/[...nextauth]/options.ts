import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { v4 as uuidv4 } from "uuid";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Nickname",
      credentials: {
        nickname: { label: "Nickname", type: "text" },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials.nickname) {
          // Generate a random ID
          const id = uuidv4(); // Example random ID generation
          // Construct user object with provided nickname and random ID
          const user = { id, name: credentials.nickname }; // Assign nickname to the name property
          return Promise.resolve(user);
        } else {
          // No nickname provided, return null
          return Promise.resolve(null);
        }
      },
    }),
  ],
};
