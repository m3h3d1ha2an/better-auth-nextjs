"use server";

import { auth } from "@/lib/auth";

export const OAuthAuthentication = async (provider: "google" | "github") =>
  await auth.api.signInSocial({
    body: {
      provider,
      callbackURL: "/",
      errorCallbackURL: "/auth/signin/error",
    },
  });
