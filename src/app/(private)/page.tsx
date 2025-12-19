import { Suspense } from "react";
import { DeleteUser } from "@/components/delete-user";
import { RoleSelect } from "@/components/role-select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Role } from "@/lib/db/prisma/enums";
import { getUserSession } from "@/lib/get-user-session";
import { getUsersFromBetterAuth } from "@/lib/get-users-from-ba";

const DashboardPage = () => (
  <main className="space-y-8 [&:has(>:only-child)]:flex [&:has(>:only-child)]:min-h-[calc(100dvh-9rem)] [&:has(>:only-child)]:items-center [&:has(>:only-child)]:justify-center">
    <Suspense fallback={<WelcomeSkeleton />}>
      <Message />
    </Suspense>
    <Suspense fallback={<ContentSkeleton />}>
      <Content />
    </Suspense>
  </main>
);

const Message = async () => {
  const result = await getUserSession();
  if (!result?.user) {
    return null;
  }
  return (
    <h1 className="text-center data-[role=Admin]:text-3xl data-[role=User]:text-4xl" data-role={result.user.role}>
      Welcome{" "}
      <span className="font-semibold data-[role=Admin]:text-blue-500 data-[role=User]:text-green-500" data-role={result.user.role}>
        {result.user.name}!
      </span>
    </h1>
  );
};

const Content = async () => {
  const result = await getUserSession();
  if (!result?.user || result.user.role !== "Admin") {
    return null;
  }

  return <UserTable />;
};

const UserTable = async () => {
  const { users } = await getUsersFromBetterAuth();
  const sorted = [...users].sort((a, b) => Number(b.role === "Admin") - Number(a.role === "Admin"));
  return (
    <Table className="mx-auto max-w-7xl border border-gray-300 text-lg">
      <TableHeader>
        <TableRow className="bg-muted/50">
          <TableHead className="font-semibold">ID</TableHead>
          <TableHead className="font-semibold">Name</TableHead>
          <TableHead className="font-semibold">Email</TableHead>
          <TableHead className="font-semibold">Role</TableHead>
          <TableHead className="text-center font-semibold">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((user) => (
          <TableRow className="hover:bg-gray-200" key={user.id}>
            <TableCell className="font-mono text-sm">{user.id.slice(0, 8)}</TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="text-muted-foreground">{user.email}</TableCell>
            <TableCell>
              {/*<span
                className="inline-flex rounded-full px-2 py-1 font-semibold text-xs data-[role=Admin]:bg-blue-100 data-[role=User]:bg-green-100 data-[role=Admin]:text-blue-800 data-[role=User]:text-green-800 dark:data-[role=Admin]:bg-blue-900 dark:data-[role=User]:bg-green-900 dark:data-[role=Admin]:text-blue-200 dark:data-[role=User]:text-green-200"
                data-role={user.role}
              >
                {user.role}
              </span>*/}
              <RoleSelect role={user.role as Role} userId={user.id} />
            </TableCell>
            <TableCell className="text-center">
              <DeleteUser user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const WelcomeSkeleton = () => (
  <div className="flex justify-center">
    <Skeleton className="h-9 w-80" />
  </div>
);

const ContentSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-8 w-48" />
    <Skeleton className="h-96 w-full" />
  </div>
);

export default DashboardPage;
