"use client";

import { Loader2 } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupWithEmail } from "./action";

export default function SignUpFrom() {
  const [_state, action, pending] = useActionState<void, FormData>(
    signupWithEmail,
    undefined,
    "/"
  );

  return (
    <Card className="z-50 max-w-md rounded-md rounded-t-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Get started</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Create your account in seconds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Mehedi Hasan"
                  required
                  type="text"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="mehedihasan@example.com"
                required
                type="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                autoComplete="new-password"
                id="password"
                name="password"
                placeholder="Password"
                required
                type="password"
              />
            </div>
            <Button className="w-full" disabled={pending} type="submit">
              {pending ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Create an account"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
