"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { requestPasswordReset } from "@/lib/auth/actions/request-password-reset";
import { cn } from "@/lib/utils";

export const ForgotForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleForgot = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsPending(true);
    const formData = new FormData(form);
    const email = String(formData.get("email"));
    const result = await requestPasswordReset(email);
    if (result.success) {
      setSuccessMessage(result.message);
    } else {
      setErrorMessage(result.message);
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleForgot}>
      {!!(errorMessage || successMessage) && (
        <p
          className={cn(
            "mb-4 w-full rounded-md border p-2 text-center text-sm",
            errorMessage ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"
          )}
        >
          {errorMessage || successMessage}
        </p>
      )}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Input disabled={isPending} id="email" name="email" placeholder="john@example.com" required type="email" />
        </div>
        <Button className="w-full cursor-pointer gap-2" disabled={isPending} type="submit">
          {!!isPending && <Spinner />}
          Submit
        </Button>
      </div>
    </form>
  );
};
