import { AuthGuard } from "@/components/auth-guard";

const PublicLayout = ({ children }: { children: React.ReactNode }) => <AuthGuard requireAuth={false}>{children}</AuthGuard>;

export default PublicLayout;
