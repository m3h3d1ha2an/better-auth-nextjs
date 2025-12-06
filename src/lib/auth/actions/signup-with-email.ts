"use server";

import { auth } from "@/lib/auth";

type InitialState = {
  success: boolean;
  message: string;
  data: object;
};

export const signUpWithEmailAction = async (_initialState: InitialState, formData: FormData) => {
  const name = String(formData.get("name"));
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!name.trim()) {
    return { success: false, message: "Enter a valid name", data: {} };
  }

  if (!email.trim()) {
    return { success: false, message: "Enter a valid email", data: {} };
  }

  if (!password.trim()) {
    return { success: false, message: "Enter a valid password", data: {} };
  }

  if (password.length < 8) {
    return {
      success: false,
      message: "Password should be at least 8 characters long",
      data: {},
    };
  }

  if (password.length > 128) {
    return {
      success: false,
      message: "Password should be at most 128 characters long",
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
    return { success: true, message: "Signup complete. Please log in to continue.", data: result };
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
