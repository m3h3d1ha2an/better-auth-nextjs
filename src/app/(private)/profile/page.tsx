import { Suspense } from "react";
import { CodeBlock } from "@/components/code-block";
import { getUserSession } from "@/lib/auth/queries/get-user-session";

const ProfilePage = () => (
  <Suspense>
    <ProfileCodeBlock />
  </Suspense>
);

const ProfileCodeBlock = async () => {
  const result = await getUserSession();
  const fallback = {
    id: "fallback",
    email: "fallback@example.com",
    name: "Fallback User",
    image: "https://example.com/fallback.png",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return <CodeBlock data={result || fallback} />;
};

export default ProfilePage;
