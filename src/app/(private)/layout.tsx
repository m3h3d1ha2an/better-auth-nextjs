import { AuthGuard } from "@/components/auth-guard";
import { Header } from "@/components/header/header";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => (
  <AuthGuard requireAuth>
    <main className="min-h-dvh space-y-4 border border-black bg-gray-100 px-16 py-8">
      <Header />
      {children}
    </main>
  </AuthGuard>
);

export default PrivateLayout;
