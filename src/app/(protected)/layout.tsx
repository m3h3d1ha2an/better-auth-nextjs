import { redirect } from "next/navigation";
import { Header } from "@/components/header/header";
import { getUserSession } from "@/lib/get-user-session";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const result = await getUserSession();
  if (!result) {
    redirect("/auth/signin");
  }
  return (
    <main className="min-h-dvh space-y-4 border border-black bg-gray-100 px-16 py-8">
      <Header />
      {children}
    </main>
  );
};

export default ProtectedLayout;
