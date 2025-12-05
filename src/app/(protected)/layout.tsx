import { redirect } from "next/navigation";
import { Header } from "@/components/header/header";
import { getUser } from "@/lib/auth/functions/get-user";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return (
    <main className="min-h-dvh space-y-4 border border-black bg-gray-100 px-16 py-8">
      <Header />
      {children}
    </main>
  );
};

export default ProtectedLayout;
