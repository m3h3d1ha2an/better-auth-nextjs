"use client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

export const ResetForm = ({ token }: { token: string }) => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirm-password"));
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }
    if (password.length > 100) {
      setErrorMessage("Password must be less than 100 characters long");
      return;
    }
    await authClient.resetPassword({
      newPassword: password,
      token,
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
          setErrorMessage(null);
          setSuccessMessage(null);
        },
        onResponse: () => {
          setIsPending(false);
          setSuccessMessage("Your password has been reset successfully.");
          form.reset();
          router.push("/auth/signin");
        },
        onError: (ctx) => {
          setErrorMessage(ctx.error.message);
        },
      },
    });
  };

  return (
    <form onSubmit={handleReset}>
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
        <div className="relative grid gap-2">
          <Label htmlFor="password">New Password</Label>
          <Input
            autoComplete="new-password"
            disabled={isPending}
            id="password"
            name="password"
            required
            type={show ? "text" : "password"}
          />
          {show ? (
            <EyeOffIcon className="absolute right-2 bottom-1.5 cursor-pointer stroke-1 text-gray-600/50" onClick={() => setShow(false)} />
          ) : (
            <EyeIcon className="absolute right-2 bottom-1.5 cursor-pointer stroke-1 text-gray-600/50" onClick={() => setShow(true)} />
          )}
        </div>
        <div className="relative grid gap-2">
          <Label htmlFor="confirm-password">Repeat New Password</Label>
          <Input
            autoComplete="confirm-password"
            disabled={isPending}
            id="confirm-password"
            name="confirm-password"
            required
            type="password"
          />
        </div>
        <Button className="w-full cursor-pointer gap-2" disabled={isPending} type="submit">
          {!!isPending && <Spinner />}
          Confirm
        </Button>
      </div>
    </form>
  );
};
