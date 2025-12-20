"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signUpWithEmailAction } from "@/lib/auth/actions/signup-with-email";

export const SignupForm = () => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await signUpWithEmailAction(formData);
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
    <form autoComplete="off" onSubmit={handleSignup}>
      {!!errorMessage && (
        <p className="mb-4 w-full rounded-md border border-red-200 bg-red-50 p-2 text-center text-red-700 text-sm">{errorMessage}</p>
      )}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input disabled={isPending} id="name" name="name" required type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input disabled={isPending} id="email" name="email" required type="email" />
        </div>
        <div className="relative grid gap-2">
          <Label htmlFor="password">Password</Label>
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
        <div className="grid gap-2">
          <Label htmlFor="image">Profile Picture (Optional) </Label>
          <Input disabled={isPending} id="image" name="image" type="url" />
        </div>
        <Button className="w-full cursor-pointer gap-2" disabled={isPending} type="submit">
          {!!isPending && <Spinner />}
          Sign Up
        </Button>
      </div>
    </form>
  );
};
