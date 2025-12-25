"use server";

import { APIError } from "better-auth";
import { auth, type ErrorCode } from "@/lib/auth";

export const resetUserPassword = async (formData: FormData, token: string) => {
  const password = String(formData.get("password"));
  const confirmPassword = String(formData.get("confirm-password"));
  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }
  if (password.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters long",
    };
  }
  if (password.length > 100) {
    return {
      success: false,
      message: "Password must be less than 100 characters long",
    };
  }

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: password,
        token,
      },
    });
    return {
      success: true,
      message: "Your password has been reset successfully.",
    };
  } catch (error) {
    if (error instanceof APIError) {
      console.error(error);
      const errorCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";
      switch (errorCode) {
        case "INVALID_TOKEN":
          return { success: false, message: "Token is invalid" };
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
