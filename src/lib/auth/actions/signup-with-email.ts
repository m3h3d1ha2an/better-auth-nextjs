"use server";

import { APIError } from "better-auth/api";
import { auth, type ErrorCode } from "@/lib/auth";

export const signUpWithEmail = async (formData: FormData) => {
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!name.trim()) {
    return { success: false, message: "Enter a valid name" };
  }

  if (!email.trim()) {
    return { success: false, message: "Enter a valid email" };
  }

  if (!password.trim()) {
    return { success: false, message: "Enter a valid password" };
  }

  if (password.length < 8) {
    return { success: false, message: "Password should be at least 8 characters long" };
  }

  if (password.length > 100) {
    return { success: false, message: "Password should be at most 100 characters long" };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        image: process.env.DEFAULT_IMAGE_URL,
      },
    });
    return { success: true, message: "We’ve sent you an email. Check your inbox to get started." };
  } catch (error) {
    if (error instanceof APIError) {
      console.error(error);
      const errorCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";
      switch (errorCode) {
        case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
          return { success: false, message: "Email already in use. Please use another email." };
        default:
          return { success: false, message: "Something went wrong. Please try again." };
      }
    }
    return { success: false, message: "Internal Server Error" };
  }
};
