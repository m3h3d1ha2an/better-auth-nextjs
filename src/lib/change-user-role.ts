"use server";

import { headers } from "next/headers";
import { auth } from "./auth";
import { db } from "./db";
import type { Role } from "./db/prisma/enums";

export const changeUserRole = async (userId: string, role: Role) => {
  const result = await auth.api.userHasPermission({
    headers: await headers(),
    body: { permissions: { user: ["set-role"] } },
  });
  if (!result.success) {
    return { success: false, message: "Forbidden, you are not authorized." };
  }
  const user = await db.user.update({ where: { id: userId }, data: { role } });
  return { success: true, message: `${user.name} role changed to ${role}` };
};
