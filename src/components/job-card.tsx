"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getDownloadUrl,
  getJobStatus,
  type Job,
  type JobStatusValue,
  type DownloadStage,
} from "@/lib/api";

const STATUS_STYLES: Record<JobStatusValue, { badge: string; label: string }> = {
  PENDING: {
    badge: "bg-surface text-steel",
    label: "Pending",
  },
  PROCESSING: {
    badge: "bg-brand-blue/10 text-brand-blue-deep",
    label: "Processing",
  },
  DONE: {
    badge: "bg-success-bg text-success-text",
    label: "Done",
  },
  FAILED: {
    badge: "bg-error/10 text-error",
    label: "Failed",
  },
};

const DOWNLOADS: { stage: DownloadStage; label: string }[] = [
  { stage: "separated1", label: "Speaker 1" },
  { stage: "separated2", label: "Speaker 2" },
  { stage: "transcribe", label: "Transcript" },
];

export function JobCard({ job }: { job: Job }) {
  const [status, setStatus] = useState<JobStatusValue>(job.status ?? "PENDING");

  const poll = useCallback(async () => {
    try {
      const s = await getJobStatus(job.job_id);
      setStatus(s.status);
    } catch {
      // keep polling on transient errors
    }
  }, [job.job_id]);

  useEffect(() => {
    if (status === "DONE" || status === "FAILED") return;
    const id = setInterval(poll, 4000);
    poll();
    return () => clearInterval(id);
  }, [status, poll]);

  const style = STATUS_STYLES[status];

  return (
    <div className="rounded-2xl border border-hairline bg-canvas p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="card-title truncate text-ink">{job.filename}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}>
              {style.label}
            </span>
          </div>
          {job.summary && (
            <p className="body-sm mt-1 line-clamp-2 text-steel">{job.summary}</p>
          )}
          <p className="text-micro mt-2 text-stone">
            {new Date(job.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {status === "DONE" && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-hairline-soft pt-4">
          {DOWNLOADS.map((d) => (
            <DownloadButton
              key={d.stage}
              jobId={job.job_id}
              stage={d.stage}
              label={d.label}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DownloadButton({
  jobId,
  stage,
  label,
}: {
  jobId: string;
  stage: DownloadStage;
  label: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const { download_url } = await getDownloadUrl(jobId, stage);
      window.open(download_url, "_blank");
    } catch {
      // silently fail — user can retry
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface disabled:opacity-60"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
      {loading ? "Loading…" : label}
    </button>
  );
}
