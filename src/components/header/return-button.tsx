"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const ReturnButton = () => {
  const pathname = usePathname();

  // Splits the pathname into segments (parts) by '/' and removes any empty strings.
  // Example: "/settings/account" -> ["settings", "account"]
  // Example: "/" -> [] (empty array)
  const pathSegments = pathname.split("/").filter(Boolean);

  // If there are no path segments, it means we are at the root path ("/").
  // In this case, there's no "previous" page to go back to, so we display a non functinal "Home" button.
  if (pathSegments.length === 0) {
    return <Button className="cursor-not-allowed">Home</Button>;
  }

  // Declares variables to store the path to navigate to and the text for the button.
  let previousPath: string;
  let buttonLabel: string;

  // Checks if the current path is a top-level page (e.g., "/profile").
  if (pathSegments.length === 1) {
    previousPath = "/"; // The previous path is always the home page.
    buttonLabel = "Home"; // The button will say "Home".
  } else {
    // If the path is deeper (e.g., "/settings/account"), we want to go up one level.
    // .slice(0, -1) removes the last segment. .join("/") puts the remaining segments back together with '/'.
    // Template literal (``) is used for cleaner string concatenation.
    previousPath = `/${pathSegments.slice(0, -1).join("/")}`;

    // Gets the second-to-last segment of the path (e.g., "settings" from ["settings", "account"]).
    // .at(-2) is a modern way to access elements from the end of an array.
    const lastSegment = pathSegments.at(-2);

    // Sets the button label to the capitalized previous segment, or "Back" as a fallback.
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
