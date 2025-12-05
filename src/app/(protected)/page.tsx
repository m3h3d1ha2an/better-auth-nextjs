import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth/functions/get-user";

const LandingPage = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }
  return (
    <main>
      <h3>Welcome {user.name}!</h3>
    </main>
  );
};

export default LandingPage;
