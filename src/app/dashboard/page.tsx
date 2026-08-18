"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { UploadZone } from "@/components/upload-zone";
import { JobsList } from "@/components/jobs-list";
import { FadeIn } from "@/components/interactions";

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
        <p className="body-md text-mute">Loading…</p>
      </div>
    );
  }

  return (
    <div className="bg-canvas px-6 py-10">
      <div className="mx-auto max-w-[960px]">
        <FadeIn>
          <div className="mb-1">
            <p className="caption-sm text-mute">Dashboard</p>
          </div>
          <h1 className="heading-xl text-ink">Your workspace</h1>
          <p className="body-lg mt-1 text-body">
            Upload audio files and track your processing jobs.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <section className="mt-8">
            <h2 className="heading-md text-on-dark">New upload</h2>
            <div className="mt-3">
              <UploadZone
                onUploadComplete={() => setRefreshKey((k) => k + 1)}
              />
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section className="mt-8">
            <h2 className="heading-md text-on-dark">Your jobs</h2>
            <div className="mt-3">
              <JobsList refreshKey={refreshKey} />
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
