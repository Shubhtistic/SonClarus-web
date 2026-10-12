"use client";

import { StatsCard } from "./stats-card";
import { ActivityLog } from "./activity-log";

export function DashboardOverview() {
  return (
    <div className="space-y-10">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Storage Used"
          value="45.2 MB"
          subtext="of 500 MB"
          percent={45}
          color="var(--color-primary-blue)"
        />
        <StatsCard
          title="Active Jobs"
          value="3"
          subtext="Processing now"
          color="var(--color-primary-orange)"
        />
        <StatsCard
          title="Completed"
          value="12"
          subtext="Total processed"
          color="var(--color-primary-green)"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        {/* Activity Log (Static) */}
        <div>
          <h2 className="heading-lg font-heading-utility text-foreground mb-6">Recent Activity</h2>
          <ActivityLog />
        </div>

        {/* Quick Tips or Server Info */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="heading-sm font-heading-utility mb-3 text-primary-blue">Quick Tip</h3>
            <p className="body-sm text-muted-foreground font-body">
              For best results, upload clean WAV files. Our denoising stage can handle background noise, but high-quality inputs yield better transcripts.
            </p>
          </div>
          
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="heading-sm font-heading-utility mb-3">Server Info</h3>
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
    </div>
  );
}
