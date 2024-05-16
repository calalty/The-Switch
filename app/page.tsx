import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { Header } from "@/components/Header";
import SignInPage from "@/components/SignInPage";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <SignInPage />;
}
