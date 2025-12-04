import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => (
  <div className="flex min-h-screen items-center justify-center">
    <Button asChild className="cursor-pointer">
      <Link href="/auth/signup">Sign Up</Link>
    </Button>
  </div>
);

export default Page;
