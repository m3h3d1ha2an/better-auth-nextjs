"use client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { resetUserPassword } from "@/lib/auth/actions/reset-user-password";

export const ResetForm = ({ token }: { token: string }) => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await resetUserPassword(formData, token);
    if (result.success) {
      toast.success(result.message);
      form.reset();
      router.push("/auth/signin");
    } else {
      setErrorMessage(result.message);
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleReset}>
      {!!errorMessage && (
        <p className="mb-4 w-full rounded-md border border-red-200 bg-red-50 p-2 text-center text-red-700 text-sm">{errorMessage}</p>
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
