import { headers } from "next/headers";
import { auth } from "@/lib/auth";
export const getUserSession = async () => await auth.api.getSession({ headers: await headers() });
