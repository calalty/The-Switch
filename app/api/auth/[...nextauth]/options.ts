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
      authorize: async (credentials, _req) => {
        if (credentials && credentials.nickname) {
          const id = uuidv4();
          const user = { id, name: credentials.nickname };
          debugger;
          return Promise.resolve({ ...user });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account?.providerAccountId;
        debugger;
        return token;
      }

      debugger;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        debugger;
        session.user.id = token.id as string;
      }

      debugger;
      return session;
    },
  },
};
