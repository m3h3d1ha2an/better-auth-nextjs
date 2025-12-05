"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const ReturnButton = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) {
    return <Button className="cursor-not-allowed">Home</Button>;
  }
  let previousPath: string;
  let buttonLabel: string;

  if (pathSegments.length === 1) {
    previousPath = "/";
    buttonLabel = "Home";
  } else {
    previousPath = `/${pathSegments.slice(0, -1).join("/")}`;
    const lastSegment = pathSegments.at(-2);
    buttonLabel = lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : "Back";
  }

  return (
    <Button asChild>
      <Link href={previousPath}>
        <ArrowLeft />
        {buttonLabel}
      </Link>
    </Button>
  );
};
