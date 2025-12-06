import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/get-user-session";

const LandingPage = async () => {
  const result = await getUserSession();
  if (!result) {
    redirect("/auth/signin");
  }
  return (
    <main>
      <h3>Welcome {result.user.name}!</h3>
    </main>
  );
};

export default LandingPage;
