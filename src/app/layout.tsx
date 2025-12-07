import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Better Auth Next.js",
  description: "Experiment with better auth implementation in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="bg-white text-black selection:bg-black selection:text-white" lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-gray-50 antialiased`}>
        {children}
        <Toaster position="top-center" richColors theme="light" />
      </body>
    </html>
  );
}
