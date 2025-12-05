import { redirect } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { getUser } from "@/lib/auth/functions/get-user";

const Profile = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <main>
      <CodeBlock data={user} />
    </main>
  );
};

export default Profile;
