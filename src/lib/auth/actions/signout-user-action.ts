"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const signOutUserAction = async () =>
  await auth.api.signOut({
    headers: await headers(),
  });
