"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";
import { auth, type ErrorCode } from "@/lib/auth";

export const changeUserPassword = async (formData: FormData) => {
  const currentPassword = String(formData.get("current-password"));
  const newPassword = String(formData.get("new-password"));

  if (!currentPassword.trim()) {
    return { success: false, message: "Enter a valid password" };
  }

  if (!newPassword.trim()) {
    return { success: false, message: "Enter a valid password" };
  }

  if (newPassword.length < 8) {
    return {
      success: false,
      message: "Password should be at least 8 characters long",
    };
  }

  if (newPassword.length > 100) {
    return {
      success: false,
      message: "Password should be at most 100 characters long",
    };
  }
  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      },
    });
    return { success: true, message: "Password changed successfully" };
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
