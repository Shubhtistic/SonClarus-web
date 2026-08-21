"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <p className="text-[15px] text-muted-foreground">Loading…</p>
      </div>
    );
  }

  return (
    <div className="bg-background px-6 py-10">
      <div className="mx-auto max-w-[960px]">
        <div className="mb-1">
          <p className="text-[12px] text-foreground-faint uppercase tracking-wider">Dashboard</p>
        </div>
        <h1 className="heading-xl text-primary mt-1">Your workspace</h1>
        <p className="body-lg mt-1 text-muted-foreground">
          Upload audio files and track your processing jobs.
        </p>
      </div>
    </div>
  );
}
