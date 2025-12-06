"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signUpWithEmailAction } from "@/lib/auth/actions/signup-with-email";

const initialState = { success: false, message: "", data: {} };

export const SignupForm = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [state, action, pending] = useActionState(signUpWithEmailAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/auth/signin");
    }
  }, [state, router]);

  return (
    <form action={action} autoComplete="off">
      {!state.success && state.message && (
        <p className="mb-4 w-full rounded-md border border-red-200 bg-red-50 p-2 text-center text-red-700 text-sm">{state.message}</p>
      )}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input disabled={pending} id="name" name="name" required type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input disabled={pending} id="email" name="email" required type="email" />
        </div>
        <div className="relative grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input autoComplete="new-password" disabled={pending} id="password" name="password" required type={show ? "text" : "password"} />
          {show ? (
            <EyeOffIcon className="absolute right-2 bottom-1.5 cursor-pointer stroke-1 text-gray-600/50" onClick={() => setShow(false)} />
          ) : (
            <EyeIcon className="absolute right-2 bottom-1.5 cursor-pointer stroke-1 text-gray-600/50" onClick={() => setShow(true)} />
          )}
        </div>
        <Button className="w-full cursor-pointer gap-2" disabled={pending} type="submit">
          {pending ? (
            <>
              <Spinner />
              Creating account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>
    </form>
  );
};
