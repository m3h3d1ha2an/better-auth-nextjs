import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/auth/queries/get-user-session";

type AuthGuardProps = {
  children: React.ReactNode;
  requireAuth: boolean;
  redirectTo?: string;
};

export const AuthGuard = async ({ children, requireAuth, redirectTo = requireAuth ? "/auth/signin" : "/" }: AuthGuardProps) => {
  const result = await getUserSession();
  const isAuthenticated = !!result?.session;

  if (requireAuth !== isAuthenticated) {
    redirect(redirectTo);
  }
  return children;
};
