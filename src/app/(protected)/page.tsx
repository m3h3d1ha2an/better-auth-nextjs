import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/get-user-session";

const LandingPage = async () => {
  const result = await getUserSession();
  if (!result) {
    redirect("/auth/signin");
  }
  return (
    <main className="flex min-h-[calc(100dvh-9rem)] items-center justify-center font-medium text-5xl">
      <h3>Welcome {result.user.name}!</h3>
    </main>
  );
};

export default LandingPage;
