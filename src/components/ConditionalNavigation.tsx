"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";

export function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Hide navigation on auth, dashboard, and careers routes
  if (pathname?.startsWith("/login") || pathname?.startsWith("/dashboard") || pathname?.startsWith("/careers")) {
    return null;
  }

  return <Navigation />;
}
