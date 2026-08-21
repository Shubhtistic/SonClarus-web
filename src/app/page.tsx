"use client";

import Scanner from "@/components/Scanner";
import Terminal from "@/components/Terminal";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full">
      <Scanner className="absolute inset-0" />
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-24">
        <Terminal />
      </div>
    </div>
  );
}
