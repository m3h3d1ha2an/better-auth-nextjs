"use server";

import { APIError } from "better-auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { auth, type ErrorCode } from "@/lib/auth";
import { getUserSession } from "@/lib/auth/queries/get-user-session";

export const deleteUserAction = async (userId: string) => {
  const result = await getUserSession();
  if (!result) {
    throw new Error("Forbidden: Unauthorized Access");
  }
  if (result.user.role !== "Admin") {
    throw new Error("Forbidden: Unauthorized Access");
  }
  try {
    await auth.api.removeUser({ body: { userId }, headers: await headers() });
    revalidatePath("/");
    return { success: true, message: "User deleted successfully" };
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
