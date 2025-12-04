import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignupForm } from "./form";

const Signup = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Card className="z-50 w-full max-w-md rounded-md rounded-t-none">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Get started</CardTitle>
        <CardDescription className="text-xs md:text-sm">Create your account in seconds</CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
      </CardContent>
    </Card>
  </div>
);

export default Signup;
