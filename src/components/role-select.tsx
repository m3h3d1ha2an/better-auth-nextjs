"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { changeUserRole } from "@/lib/auth/actions/change-user-role";
import { Role } from "@/lib/db/prisma/enums";

export const RoleSelect = ({ userId, role }: { userId: string; role: Role }) => {
  const router = useRouter();
  const handleRoleChange = async (value: Role) => {
    const toastId = toast.loading("Updating user role...");
    const result = await changeUserRole(userId, value);
    if (result.success) {
      toast.success(result.message, { id: toastId });
    } else {
      toast.error(result.message, { id: toastId });
    }
    router.refresh();
  };

  return (
    <Select disabled={role === Role.Admin} onValueChange={handleRoleChange} value={role}>
      <SelectTrigger>
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(Role).map((option: Role) => (
          <SelectItem
            className="data-[role=Admin]:text-blue-800 data-[role=User]:text-green-800 data-[role=Admin]:hover:bg-blue-100 data-[role=User]:hover:bg-green-100 dark:data-[role=Admin]:text-blue-200 dark:data-[role=User]:text-green-200 dark:data-[role=Admin]:hover:bg-blue-900 dark:data-[role=User]:hover:bg-green-900"
            data-role={option}
            key={option}
            value={option}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
