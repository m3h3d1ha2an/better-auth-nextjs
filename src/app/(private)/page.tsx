import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserSession } from "@/lib/get-user-session";

const LandingPage = () => (
  <main className="flex min-h-[calc(100dvh-9rem)] items-center justify-center font-medium text-5xl">
    <Suspense fallback={<Skeleton className="h-10 w-40" />}>
      <WelcomeMessage />
    </Suspense>
  </main>
);

const WelcomeMessage = async () => {
  const result = await getUserSession();
  if (!result?.user) {
    return <h3>Please sign in</h3>;
  }
  return (
    <h3>
      Welcome{" "}
      <span
        className="font-semibold data-[role=ADMIN]:text-red-500 data-[role=SUPERADMIN]:text-blue-500 data-[role=USER]:text-green-500"
        data-role={result.user.role}
      >
        {result.user.name}!
      </span>
    </h3>
  );
};

export default LandingPage;
