"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { getUserSession } from "./get-user-session";

export const deleteUserAction = async (userId: string) => {
  const result = await getUserSession();
  if (!result) {
    throw new Error("Forbidden: Unauthorized Access");
  }
  if (result.user.role !== "Admin") {
    throw new Error("Forbidden: Unauthorized Access");
  }
  try {
    await db.user.delete({
      where: { id: userId, role: "User" },
    });
    revalidatePath("/");
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Internal Server Error" };
  }
};
