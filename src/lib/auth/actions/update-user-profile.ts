"use server";

import { APIError } from "better-auth";
import { headers } from "next/headers";
import { auth, type ErrorCode } from "@/lib/auth";

export const updateUserProfile = async (formData: FormData) => {
  const firstName = String(formData.get("first-name"));
  const lastName = String(formData.get("last-name"));
  const name = `${firstName} ${lastName}`;
  // const image = String(formData.get("image"));

  try {
    await auth.api.updateUser({
      headers: await headers(),
      body: {
        name,
        // image
      },
    });
    return { success: true, message: "User profile updated successfully" };
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      const errorCode = error.body ? (error.body.code as ErrorCode) : "UNKNOWN";
      switch (errorCode) {
        case "NO_DATA_TO_UPDATE":
          return { success: false, message: "No data to update" };
        default:
          return {
            success: false,
            message: error.message || "Something went wrong. Please try again.",
          };
      }
    }
    return { success: false, message: "An unexpected error occurred" };
  }
};
