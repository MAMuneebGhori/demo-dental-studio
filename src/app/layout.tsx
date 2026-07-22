import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "@fontsource/mona-sans";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { AntiGravityChatWidget } from "@/components/AntiGravityChatWidget";
import { cn } from "@/lib/utils";
import Link from "next/link";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const fontHeading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEMO Dental Clinic",
  description: "Dentistry that will make you smile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", fontHeading.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans relative">
        <Navigation />
        {children}
        <AntiGravityChatWidget />
      </body>
    </html>
  );
}
