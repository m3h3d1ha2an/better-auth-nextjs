"use server";

import { auth } from "@/lib/auth";

type InitialState = {
  success: boolean;
  message: string;
  data: object;
};

export const signUpWithEmailAction = async (_initialState: InitialState, formData: FormData) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof name !== "string" || !name.trim()) {
    return { success: false, message: "Enter a valid name", data: {} };
  }

  if (typeof email !== "string" || !email.trim()) {
    return { success: false, message: "Enter a valid email", data: {} };
  }

  if (typeof password !== "string" || password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters",
      data: {},
    };
  }

  const username = email.split("@")[0].toLowerCase();

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        image: `https://avatar.iran.liara.run/public/boy?username=${username}`,
      },
    });
    return { success: true, message: "Signup completed successfully", data: result };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        data: {},
      };
    }
    return {
      success: false,
      message: "An unknown error occurred",
      data: {},
    };
  }
};
