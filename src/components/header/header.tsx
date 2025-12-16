import { Suspense } from "react";
import { ReturnButton } from "@/components/header/return-button";
import { UserDropdown } from "@/components/header/user-dropdown";
import { Skeleton } from "@/components/ui/skeleton";

const UserDropdownSkeleton = () => (
  <div className="relative inline-flex rounded-full border-2 border-gray-300">
    <Skeleton className="size-10 rounded-full" />
  </div>
);

export const Header = () => (
  <header className="mb-8 flex items-center justify-between">
    <ReturnButton />
    <Suspense fallback={<UserDropdownSkeleton />}>
      <UserDropdown />
    </Suspense>
  </header>
);
