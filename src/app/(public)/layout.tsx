import { Suspense } from "react";
import { AuthGuard } from "@/components/auth-guard";
import { Spinner } from "@/components/ui/spinner";

const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <div className="flex min-h-dvh items-center justify-center">
        <Spinner className="size-8" />
      </div>
    }
  >
    <AuthGuard requireAuth={false}>{children}</AuthGuard>
  </Suspense>
);

export default PublicLayout;
