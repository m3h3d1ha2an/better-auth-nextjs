import Image from "next/image";
import Link from "next/link";
import { SignupForm } from "@/components/form/signup-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NextJSIcon } from "@/lib/icons/nextjs";

const Signup = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Card className="z-50 w-full max-w-sm gap-4 rounded-3xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Image alt="Logo" height={50} src="/betterauth.png" width={50} />
          <p className="text-3xl">+</p>
          <NextJSIcon />
        </div>
        <CardTitle className="text-lg md:text-xl">Create an account</CardTitle>
        <CardDescription className="text-xs md:text-sm">Welcome! Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link className="text-primary hover:underline" href="/auth/signin">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  </div>
);

export default Signup;
