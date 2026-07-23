import React from "react";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-[#0D241C]/10 rounded-md ${className}`} />
  );
}
