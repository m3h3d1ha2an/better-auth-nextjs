import { Suspense } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { Header } from "@/components/header/header";
import { Spinner } from "@/components/ui/spinner";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex min-h-dvh items-center justify-center">
        <Spinner className="size-8" />
      </div>
    }
  >
    <AuthGuard requireAuth>
      <main className="min-h-dvh space-y-4 border border-black bg-gray-100 px-16 py-8">
        <Header />
        {children}
      </main>
    </AuthGuard>
  </Suspense>
);

export default PrivateLayout;
