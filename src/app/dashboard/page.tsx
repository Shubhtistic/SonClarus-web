"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { UploadZone } from "@/components/upload-zone";
import { JobsList } from "@/components/jobs-list";

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex flex-1 items-center justify-center py-24">
        <p className="body-md text-on-dark-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div className="bg-surface-canvas-dark px-6 py-10">
      <div className="mx-auto max-w-[960px]">
        <div className="mb-2">
          <p className="micro-cap text-accent-lime">Dashboard</p>
        </div>
        <h1 className="heading-xl text-on-primary">Your workspace</h1>
        <p className="body-lg mt-2 text-on-dark-muted">
          Upload audio files and track your processing jobs.
        </p>

        <section className="mt-10">
          <h2 className="heading-md text-on-primary">New upload</h2>
          <div className="mt-4">
            <UploadZone
              onUploadComplete={() => setRefreshKey((k) => k + 1)}
            />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="heading-md text-on-primary">Your jobs</h2>
          <div className="mt-4">
            <JobsList refreshKey={refreshKey} />
          </div>
        </section>
      </div>
    </div>
  );
}
