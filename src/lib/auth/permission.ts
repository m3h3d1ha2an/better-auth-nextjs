import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";
import { Role } from "@/lib/db/prisma/enums";

const statement = {
  ...defaultStatements,
  posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
} as const;

export const ac = createAccessControl(statement);

export const roles = {
  [Role.User]: ac.newRole({
    posts: ["create", "read", "update:own", "delete:own"],
  }),
  [Role.Admin]: ac.newRole({
    ...adminAc.statements,
    posts: ["create", "read", "update", "delete", "update:own", "delete:own"],
  }),
};
