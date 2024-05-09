import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { Header } from "@/components/Header";
import SignInPage from "@/components/SignInPage";

export default async function Home() {
  const session = await getServerSession();

  console.log('server session', { session })

  return (
    <Providers session={session}>
      <h1>{JSON.stringify(session?.user)}</h1>
      <Header session={session} />
      <SignInPage />
    </Providers>
  );
}
