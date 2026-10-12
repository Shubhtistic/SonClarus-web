"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { UploadZone } from "@/components/upload-zone";
import { JobsList } from "@/components/jobs-list";
import { DashboardOverview } from "@/components/dashboard-overview";

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <p className="body-md text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="mx-auto max-w-[1480px] px-8">
        <div className="mb-10">
          <p className="caption-sm text-foreground-faint">Dashboard</p>
          <h1 className="hero-display mt-2 text-primary">Your workspace</h1>
          <p className="body-lg mt-1 text-muted-foreground">
            Monitor activity, manage storage, and upload new audio files.
          </p>
        </div>

        {/* Overview (Stats + Logs) */}
        <DashboardOverview />

        <div className="grid gap-8 lg:grid-cols-[1fr_420px] items-stretch mt-16 min-w-0">
          <div className="flex flex-col min-w-0">
            <h2 className="heading-lg font-heading-utility text-foreground mb-6">Recent Jobs</h2>
            <div className="flex-1 rounded-lg border border-border bg-card p-5 min-w-0 flex flex-col justify-start">
              <JobsList refreshKey={refreshKey} />
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <h2 className="heading-lg font-heading-utility text-foreground mb-6">Process new audio</h2>
            <div className="flex-1 flex flex-col min-w-0">
              <UploadZone onUploadComplete={() => setRefreshKey(prev => prev + 1)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
