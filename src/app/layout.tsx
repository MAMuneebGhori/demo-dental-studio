import type { Metadata } from "next";
import { Space_Grotesk, Geist } from "next/font/google";
import "@fontsource/mona-sans";
import "./globals.css";
import { ConditionalNavigation } from "@/components/ConditionalNavigation";
import { AntiGravityChatWidget } from "@/components/AntiGravityChatWidget";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Script from "next/script";
import { Toaster } from "sonner";

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
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        <ConditionalNavigation />
        {children}
        <AntiGravityChatWidget />
        <Toaster position="top-right" richColors />

        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement({pageLanguage: 'en', autoDisplay: false}, 'google_translate_element');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
