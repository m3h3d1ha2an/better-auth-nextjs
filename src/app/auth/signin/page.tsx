import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth/functions/get-session";
import { SigninForm } from "./form";

const Signin = async () => {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="z-50 w-full max-w-sm rounded-3xl">
        <CardHeader className="text-center">
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
