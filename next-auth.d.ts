// types/next-auth.d.ts or any .ts/.d.ts file in your project
import "next-auth";

// Extend the User model if you need to add more properties to the user
declare module "next-auth" {
  interface User {
    email?: string | null;
    id?: string | null;
    name?: string | null;
    joinedAt?: string;
  }

  // Extend the session and add your custom property
  interface Session {
    isRefreshError: boolean;
    accessToken?: string;
    accessTokenExpires?: number;
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string | undefined;
    accessTokenExpires: number;
    refreshToken: string | undefined;
  }
}
