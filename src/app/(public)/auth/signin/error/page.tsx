import { Plus, ShieldQuestionMark, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ErrorPage = async ({ searchParams }: { searchParams: Promise<{ error: string }> }) => {
  const error = (await searchParams).error;
  const message =
    error === "account_not_linked"
      ? "This account is already linked to another sign-in method."
      : "Oops, something went wrong. Please try again.";
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="space-y-8 text-center">
        <div className="flex items-center justify-center gap-x-4">
          {error === "account_not_linked" && (
            <>
              <UserRound className="size-10" />
              <Plus className="size-10" />
            </>
          )}
          <ShieldQuestionMark className="size-10" />
        </div>
        <p className="text-xl">{message}</p>
        <Button asChild>
          <Link href="/auth/signin">Back to Sign In</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
