import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserSession } from "@/lib/get-user-session";

const AdminPage = () => (
  <main className="flex min-h-[calc(100dvh-9rem)] items-center justify-center">
    <Suspense fallback={<Skeleton className="h-9 w-full" />}>
      <DynamicMessage />
    </Suspense>
  </main>
);

const DynamicMessage = async () => {
  const result = await getUserSession();
  if (result?.user.role !== "admin") {
    return <h1 className="font-semibold text-2xl text-red-500">You are not authorized to access this page.</h1>;
  }
  return <h1 className="font-semibold text-2xl text-gray-900">Admin Dashboard</h1>;
};

export default AdminPage;
