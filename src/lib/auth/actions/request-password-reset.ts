"use server";

import { APIError } from "better-auth";
import { auth, type ErrorCode } from "..";

export const requestPasswordReset = async (email: string) => {
  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: "/auth/reset",
      },
    });
    return { success: true, message: "A password reset link has been sent to your email." };
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
