import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function normalizeName(name: string) {
  // Step 1: trim + collapse internal spaces
  const collapsed = name.trim().replace(/\s+/g, " ");

  // Step 2: remove accents (é → e, á → a)
  const ascii = collapsed.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Step 3: remove unwanted characters (keep letters, spaces, hyphens, apostrophes)
  const cleaned = ascii.replace(/[^a-zA-Z\s'-]/g, "");

  // Step 4: title-case each part
  const result = cleaned
    .split(" ")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  return result;
}
