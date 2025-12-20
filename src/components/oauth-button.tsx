"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { Button } from "./ui/button";

export const OAuthButton = ({ provider, method }: { provider: "google" | "github"; method: "signin" | "signup" }) => {
  const [isPending, setIsPending] = useState(false);
  const icon =
    provider === "google"
      ? "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/google.svg"
      : "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github.svg";
  const handleOAuthSignIn = async () => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
      errorCallbackURL: "/auth/signin/error",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  };
  return (
    <Button
      className="w-40 rounded-lg border text-sm capitalize"
      disabled={isPending}
      onClick={method === "signin" ? handleOAuthSignIn : undefined}
      variant="outline"
    >
      <Image alt={provider} height={14} src={icon} width={14} />
      {provider}
    </Button>
  );
};
