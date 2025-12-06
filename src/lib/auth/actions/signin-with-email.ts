"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

type InitialState = {
  success: boolean;
  message: string;
  data: object;
};

export const signinWithEmailAction = async (_initialState: InitialState, formData: FormData) => {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  if (!email.trim()) {
    return { success: false, message: "Enter a valid email", data: {} };
  }

  if (!password.trim()) {
    return { success: false, message: "Enter a valid password", data: {} };
  }

  try {
    const result = await auth.api.signInEmail({ headers: await headers(), body: { email, password } });
    return { success: true, message: "Signin successfull. Good to see you back!", data: result };
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
