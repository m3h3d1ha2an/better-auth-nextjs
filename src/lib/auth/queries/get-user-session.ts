import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/lib/auth";
export const getUserSession = cache(async () => await auth.api.getSession({ headers: await headers() }));
