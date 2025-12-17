"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

type ReturnButtonProps = {
  basePath?: string; // e.g. "/", "/admin"
};

const TRAILING_SLASH_REGEX = /\/$/;

export const ReturnButton = ({ basePath = "/" }: ReturnButtonProps) => {
  const pathname = usePathname();

  // Normalize basePath (remove trailing slash)
  const normalizedBase = basePath !== "/" ? basePath.replace(TRAILING_SLASH_REGEX, "") : "/";

  // Remove basePath from pathname before splitting
  const relativePath = normalizedBase !== "/" && pathname.startsWith(normalizedBase) ? pathname.slice(normalizedBase.length) : pathname;

  const pathSegments = relativePath.split("/").filter(Boolean);

  // At base path → no back navigation
  if (pathSegments.length === 0) {
    return <Button className="cursor-not-allowed">Dashboard</Button>;
  }

  let previousPath: string;
  let buttonLabel: string;

  if (pathSegments.length === 1) {
    previousPath = normalizedBase;
    buttonLabel = "Dashboard";
  } else {
    const parent = pathSegments.slice(0, -1).join("/");
    previousPath = normalizedBase === "/" ? `/${parent}` : `${normalizedBase}/${parent}`;

    const lastSegment = pathSegments.at(-2);
    buttonLabel = lastSegment ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) : "Back";
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button asChild size="icon">
        <Link href={previousPath}>
          <ChevronLeft />
        </Link>
      </Button>
      <Button asChild>
        <Link href={previousPath}>{buttonLabel}</Link>
      </Button>
    </div>
  );
};
