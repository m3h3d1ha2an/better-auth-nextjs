import { Suspense } from "react";
// import { CodeBlock } from "@/components/code-block";
import { ProfileForm } from "@/components/form/profile-form";
import type { Session } from "@/lib/auth";
import { getUserSession } from "@/lib/auth/queries/get-user-session";

const ProfilePage = () => (
  <Suspense>
    <ProfileEditForm />
  </Suspense>
);

// const ProfileCodeBlock = async () => {
//   const result = await getUserSession();
//   const fallback = {
//     id: "fallback",
//     email: "fallback@example.com",
//     name: "Fallback User",
//     image: "https://example.com/fallback.png",
//     role: "user",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
//   return <CodeBlock data={result || fallback} />;
// };

const ProfileEditForm = async () => {
  const result = await getUserSession();
  const fallback: Session["user"] = {
    id: "fallback",
    email: "fallback@example.com",
    name: "Fallback User",
    image: "https://example.com/fallback.png",
    role: "User",
    emailVerified: false,
    banned: false,
    banReason: null,
    banExpires: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return <ProfileForm user={result ? result.user : fallback} />;
};

export default ProfilePage;
