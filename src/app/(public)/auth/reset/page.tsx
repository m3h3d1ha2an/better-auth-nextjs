import Image from "next/image";
import { redirect } from "next/navigation";
import { ResetForm } from "@/components/form/reset-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NextJSIcon } from "@/lib/icons/nextjs";

const Reset = async ({ searchParams }: { searchParams: Promise<{ token: string }> }) => {
  const { token } = await searchParams;
  if (!token) {
    redirect("/auth/signin");
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="z-50 w-full max-w-sm gap-4 rounded-3xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2">
            <Image alt="Logo" height={50} src="/betterauth.png" width={50} />
            <p className="text-3xl">+</p>
            <NextJSIcon />
          </div>
          <CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
          <CardDescription className="text-xs md:text-sm">Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <ResetForm token={token} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Reset;
