import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getSession = async () => {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result?.session) {
    return null;
  }
  return result.session;
};
