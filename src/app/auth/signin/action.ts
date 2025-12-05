"use server";

import { auth } from "@/lib/auth";

type InitialState = {
  success: boolean;
  message: string;
  data: object;
};

export const signinWithEmailAction = async (_initialState: InitialState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || !email.trim()) {
    return { success: false, message: "Enter a valid email", data: {} };
  }

  if (typeof password !== "string" || !password.trim()) {
    return { success: false, message: "Enter a valid password", data: {} };
  }

  try {
    const result = await auth.api.signInEmail({ body: { email, password, callbackURL: "/" } });
    return { success: true, message: "Signed in successfully", data: result };
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
