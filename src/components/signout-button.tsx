"use client";

import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOutUserAction } from "@/lib/auth/actions/signout-user-action";

export const SignoutButton = () => {
  const router = useRouter();
  const handleSignout = async () => {
    const result = await signOutUserAction();
    if (result.success) {
      router.push("/auth/signin");
      toast.success("Logged out successfully!");
    }
  };

  return (
    <DropdownMenuItem className="cursor-pointer text-red-600!" onClick={handleSignout}>
      <LogOutIcon className="text-red-600!" />
      Log out
    </DropdownMenuItem>
  );
};
