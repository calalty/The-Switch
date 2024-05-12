import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { v4 as uuidv4 } from "uuid";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    Credentials({
      name: "Nickname",
      credentials: {
        nickname: { label: "Nickname", type: "text" },
      },
      authorize: async (credentials, _req) => {
        if (credentials && credentials.nickname) {
          const id = uuidv4();
          const user = { id, name: credentials.nickname };
          return Promise.resolve({ ...user });
        } else {
          throw new Error();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token, user }) {
      if (token && session.user) {
        session.user.id = token.sub;
      }

      console.log("session:", session);
      return session;
    },
  },
};
