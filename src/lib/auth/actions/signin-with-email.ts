"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const signinWithEmailAction = async (formData: FormData) => {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!email.trim()) {
    return { success: false, message: "Enter a valid email" };
  }

  if (!password.trim()) {
    return { success: false, message: "Enter a valid password" };
  }

  try {
    await auth.api.signInEmail({ headers: await headers(), body: { email, password } });
    return { success: true, message: "Signin successfull. Good to see you back!" };
  } catch (error) {
    if (error instanceof APIError) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
};
