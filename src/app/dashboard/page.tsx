"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
        <p className="body-sm text-steel">Loading…</p>
      </div>
    );
  }

  return (
    <div className="px-8 py-12">
      <div className="mx-auto max-w-[960px]">
        <h1 className="heading-md text-ink">Dashboard</h1>
        <p className="body-sm mt-1 text-steel">
          Upload audio files and track your processing jobs.
        </p>

        <section className="mt-8">
          <h2 className="heading-sm text-ink">New upload</h2>
          <div className="mt-4">
            <UploadZone
              onUploadComplete={() => setRefreshKey((k) => k + 1)}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="heading-sm text-ink">Your jobs</h2>
          <div className="mt-4">
            <JobsList refreshKey={refreshKey} />
          </div>
        </section>
      </div>
    </div>
  );
}
