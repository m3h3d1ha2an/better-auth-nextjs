"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signinWithEmailAction } from "./action";

const initialState = { success: false, message: "", data: {} };

export const SigninForm = () => {
  const router = useRouter();
  const [state, action, pending] = useActionState(signinWithEmailAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      router.push("/");
    }
    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={action}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input disabled={pending} id="email" name="email" required type="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input autoComplete="password" disabled={pending} id="password" name="password" required type="password" />
        </div>
        <Button className="w-full cursor-pointer gap-2" disabled={pending} type="submit">
          {pending ? (
            <>
              <Spinner />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </div>
    </form>
  );
};
