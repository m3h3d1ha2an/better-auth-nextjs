import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getUser = async () => {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result?.user) {
    return null;
  }
  return result.user;
};
