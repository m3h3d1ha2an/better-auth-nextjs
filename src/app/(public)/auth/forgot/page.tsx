import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ForgotForm } from "@/components/form/forgot-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NextJSIcon } from "@/lib/icons/nextjs";

const Forgot = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Card className="z-50 w-full max-w-sm gap-4 rounded-3xl">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Image alt="Logo" height={50} src="/betterauth.png" width={50} />
          <p className="text-3xl">+</p>
          <NextJSIcon />
        </div>
        <CardTitle className="text-lg md:text-xl">Forgot Password</CardTitle>
        <CardDescription className="text-xs md:text-sm">Enter your email to receive a password reset link</CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotForm />
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="outline">
          <ChevronLeft />
          <Link href="/auth/signin">Back to Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default Forgot;
