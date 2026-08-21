"use client";

import Scanner from "@/components/Scanner";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <Scanner className="absolute inset-0" />
    </div>
  );
}
