import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SigninForm } from "@/components/form/signin-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserSession } from "@/lib/get-user-session";
import { NextJSIcon } from "@/lib/icons/nextjs";

const Signin = async () => {
  const result = await getUserSession();
  if (result) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="z-50 w-full max-w-sm rounded-3xl">
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
        <CardFooter className="flex justify-center">
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
};

export default Signin;
