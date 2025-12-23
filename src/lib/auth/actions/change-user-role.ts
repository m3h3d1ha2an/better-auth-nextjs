"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";
import { auth, type ErrorCode } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Role } from "@/lib/db/prisma/enums";

export const changeUserRole = async (userId: string, role: Role) => {
  try {
    const result = await auth.api.userHasPermission({
      headers: await headers(),
      body: { permissions: { user: ["set-role"] } },
    });
    if (!result.success) {
      return { success: false, message: "Forbidden, you are not authorized." };
    }
    const user = await db.user.update({ where: { id: userId }, data: { role } });
    return { success: true, message: `${user.name} role changed to ${role}` };
  } catch (error) {
    if (error instanceof APIError) {
      console.error(error);
      const errorCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";
      switch (errorCode) {
        default:
          return {
            success: false,
            message: error.message || "Something went wrong. Please try again.",
          };
      }
    }
    return { success: false, message: "Internal Server Error" };
  }
};
