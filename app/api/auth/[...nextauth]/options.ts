import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { v4 as uuidv4 } from "uuid";
import redis from "@/redis";
import { deleteUserFromRoom } from "@/api/deleteUserFromRoom";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Nickname",
      credentials: {
        nickname: { label: "Nickname", type: "text" },
      },
      authorize: async (credentials, req) => {
        if (credentials && credentials.nickname) {
          const id = uuidv4();
          const user = { id, name: credentials.nickname };
          return Promise.resolve({ ...user });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.accessTokenExpires = (account.expires_at ?? 0) * 1000;
        token.refreshToken = account.refresh_token;
        token.id = account?.providerAccountId;

        return token;
      }

      if (Date.now()) {
        await deleteUserFromRoom("c84909ad-016d-401c-9f2b-8f537634abae");
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};
