"use client";

import { LogOutIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SignoutAction } from "@/lib/auth/actions/signout";

export const SignoutButton = () => {
  const handleSignout = async () => {
    await SignoutAction();
  };

  return (
    <DropdownMenuItem className="cursor-pointer text-red-600!" onClick={handleSignout}>
      <LogOutIcon className="text-red-600!" />
      Log out
    </DropdownMenuItem>
  );
};
