"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "./stats-card";
import { getUserStats, type UserStats } from "@/lib/api";

export function DashboardOverview({ refreshKey = 0 }: { refreshKey?: number }) {
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    let isMounted = true;
    getUserStats()
      .then((data) => {
        if (isMounted) setStats(data);
      })
      .catch(() => {
        // Fallback or maintain previous stats if network fails
      });
    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const usedBytes = stats ? stats.storage_used : 0;
  const limitBytes = stats ? stats.storage_limit : 524288000;
  const usedMb = (usedBytes / (1024 * 1024)).toFixed(1);
  const limitMb = Math.round(limitBytes / (1024 * 1024));
  const percent = limitBytes > 0 ? Math.min(100, Math.round((usedBytes / limitBytes) * 100)) : 0;

  const activeJobs = stats ? String(stats.jobs_processing) : "0";
  const completedJobs = stats ? String(stats.jobs_completed) : "0";

  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Storage Used"
          value={`${usedMb} MB`}
          subtext={`of ${limitMb} MB`}
          percent={percent}
          color="var(--color-primary-blue)"
        />
        <StatsCard
          title="Active Jobs"
          value={activeJobs}
          subtext="Processing now"
          color="var(--color-primary-orange)"
        />
        <StatsCard
          title="Completed"
          value={completedJobs}
          subtext="Total processed"
          color="var(--color-primary-green)"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="heading-sm font-heading-utility mb-3 text-primary-blue">Quick Tip</h3>
          <p className="body-sm text-muted-foreground font-body">
            Use clean audio files for best results. If your files have background noise, you can use our denoise stage to improve quality.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="heading-sm font-heading-utility mb-3 text-foreground">Server Info</h3>
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-muted-foreground">Version</span>
              <span className="text-foreground">0.1.0-alpha</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-muted-foreground">Node</span>
              <span className="text-primary-green">ONLINE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
