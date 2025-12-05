"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const SignoutAction = async () => {
  await auth.api.signOut({ headers: await headers() });
  redirect("/auth/signin");
};
