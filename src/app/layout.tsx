import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Auth Next.js",
  description: "Experiment with better auth implementation in Next.js",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html className="bg-white text-black selection:bg-black selection:text-white" lang="en">
    <body className={cn(bricolageGrotesque.className, "min-h-dvh bg-gray-50 antialiased")}>
      {children}
      <Toaster position="top-center" richColors theme="light" />
    </body>
  </html>
);

export default RootLayout;
