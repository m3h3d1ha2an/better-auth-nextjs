import { redirect } from "next/navigation";
import { CodeBlock } from "@/components/code-block";
import { getUserSession } from "@/lib/get-user-session";

const Profile = async () => {
  const result = await getUserSession();
  if (!result) {
    redirect("/auth/signin");
  }

  return (
    <main>
      <CodeBlock data={result} />
    </main>
  );
};

export default Profile;
