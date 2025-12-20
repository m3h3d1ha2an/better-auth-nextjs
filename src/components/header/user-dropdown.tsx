import {  Settings, UserRound } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserSession } from "@/lib/get-user-session";
import { SignoutButton } from "../signout-button";

export const UserDropdown = async () => {
  const result = await getUserSession();
  if (!result) {
    return null;
  }

  const user = result.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="relative inline-flex rounded-full border-2 data-[role=Admin]:border-blue-500 data-[role=User]:border-green-500"
          data-role={user.role}
        >
          <Avatar className="size-10 cursor-pointer">
            <AvatarImage alt={user.name} src={user.image ?? ""} />
            <AvatarFallback className="rounded-full">U</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="px-1 py-1.5 text-left text-sm leading-tight">
            <p className="truncate font-semibold">{user.name}</p>
            <p className="truncate text-muted-foreground text-xs">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/profile">
              <UserRound />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
