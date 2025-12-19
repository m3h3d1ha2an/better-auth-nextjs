"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

export const getUsersFromBetterAuth = async () =>
  await auth.api.listUsers({
    headers: await headers(),
    query: {
      sortBy: "name",
    },
  });
