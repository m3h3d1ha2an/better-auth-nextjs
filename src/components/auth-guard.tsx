import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getUserSession } from "@/lib/get-user-session";

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth: boolean;
  redirectTo?: string;
  fallback?: React.ReactNode;
};

export const AuthGuard = ({
  children,
  requireAuth,
  redirectTo = requireAuth ? "/auth/signin" : "/",
  fallback = <div aria-hidden>Loading...</div>,
}: AuthGuardProps) => (
  <Suspense fallback={fallback}>
    <AuthBoundary redirectTo={redirectTo} requireAuth={requireAuth}>
      {children}
    </AuthBoundary>
  </Suspense>
);

type AuthBoundaryProps = Required<Omit<AuthGuardProps, "fallback">>;

const AuthBoundary = async ({ children, requireAuth, redirectTo }: AuthBoundaryProps) => {
  const result = await getUserSession();
  const isAuthenticated = !!result?.session;

  if (requireAuth !== isAuthenticated) {
    redirect(redirectTo);
  }

  return children;
};
