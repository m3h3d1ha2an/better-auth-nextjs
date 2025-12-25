"use cache";

import Image from "next/image";
import Link from "next/link";
import { SigninForm } from "@/components/form/signin-form";
import { OAuthButton } from "@/components/oauth-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NextJSIcon } from "@/lib/icons/nextjs";

const Signin = async () => (
  <div className="flex min-h-screen items-center justify-center">
    <Card className="z-50 w-full max-w-sm gap-4 rounded-3xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Image alt="Logo" height={50} src="/betterauth.png" width={50} />
          <p className="text-3xl">+</p>
          <NextJSIcon />
        </div>
        <CardTitle className="text-lg md:text-xl">Welcome back!</CardTitle>
        <CardDescription className="text-xs md:text-sm">Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <SigninForm />
      </CardContent>
      <CardFooter className="flex flex-col justify-center gap-4">
        <div className="flex w-full items-center justify-center gap-4">
          <OAuthButton provider="google" />
          <OAuthButton provider="github" />
        </div>
        <p className="text-center text-muted-foreground text-sm">
          Don't have an account?{" "}
          <Link className="text-primary hover:underline" href="/auth/signup">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
);

export default Signin;
