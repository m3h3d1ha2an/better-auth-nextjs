"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signUpWithEmailAction } from "./action";

const initialState = { success: false, message: "", data: {} };

export const SignupForm = () => {
  const [state, action, pending] = useActionState(signUpWithEmailAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
    if (!state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={action}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input disabled={pending} id="name" name="name" placeholder="Mehedi Hasan" required type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input disabled={pending} id="email" name="email" placeholder="mehedihasan@example.com" required type="email" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="new-password"
            disabled={pending}
            id="password"
            name="password"
            placeholder="**************"
            required
            type="password"
          />
        </div>
        <Button className="w-full cursor-pointer gap-2" disabled={pending} type="submit">
          {pending ? (
            <>
              <Spinner />
              Creating account...
            </>
          ) : (
            "Create an account"
          )}
        </Button>
      </div>
    </form>
  );
};
