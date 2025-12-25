"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OAuthAuthentication } from "@/lib/auth/actions/oauth-authentication";
import { Button } from "./ui/button";

export const OAuthButton = ({ provider }: { provider: "google" | "github" }) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const icon =
    provider === "google"
      ? "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google.svg"
      : "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github.svg";

  const handleOAuthSignIn = async () => {
    setIsPending(true);
    const result = await OAuthAuthentication(provider);
    if (result.redirect && result.url) {
      router.push(result.url);
    }
    setIsPending(false);
  };

  return (
    <Button className="w-40 rounded-lg border text-sm capitalize" disabled={isPending} onClick={handleOAuthSignIn} variant="outline">
      <Image alt={provider} height={14} src={icon} width={14} />
      {provider}
    </Button>
  );
};
