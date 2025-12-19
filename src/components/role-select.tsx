import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/lib/db/prisma/enums";

type RoleSelectProps = {
  userId: string;
  role: Role;
};

export const RoleSelect = ({ userId, role }: RoleSelectProps) => {
  const handleRoleChange = (value: Role) => {
    console.log(value, userId);
  };
  const roleOptions = Object.values(Role);
  return (
    <Select onValueChange={handleRoleChange} value={role}>
      <SelectTrigger>
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        {roleOptions.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
