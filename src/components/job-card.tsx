"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getDownloadUrl,
  getJobStatus,
  type Job,
  type JobStatusValue,
  type DownloadStage,
} from "@/lib/api";

const STATUS_STYLES: Record<JobStatusValue, { chip: string; label: string }> = {
  PENDING: {
    chip: "bg-surface-night text-on-dark-muted",
    label: "Pending",
  },
  PROCESSING: {
    chip: "bg-accent-violet-deep text-on-primary",
    label: "Processing",
  },
  DONE: {
    chip: "bg-accent-lime text-ink-deep",
    label: "Done",
  },
  FAILED: {
    chip: "bg-error/20 text-error",
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
    return () => clearInterval(id);
  }, [status, poll]);

  const style = STATUS_STYLES[status];

  return (
    <div className="rounded-xl border border-hairline-violet bg-ink-deep p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="heading-sm truncate text-on-primary">{job.filename}</h3>
            <span
              className={`shrink-0 rounded-xs px-2 py-0.5 text-micro-cap ${style.chip}`}
            >
              {style.label}
            </span>
          </div>
          {job.summary && (
            <p className="body-md mt-1 line-clamp-2 text-on-dark-muted">{job.summary}</p>
          )}
          <p className="caption mt-2 text-on-dark-muted">
            {new Date(job.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {status === "DONE" && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-hairline-violet pt-4">
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
      className="btn-cap-light rounded-xl border border-hairline-violet bg-surface-night px-4 py-2 text-on-primary transition-colors hover:bg-white/5 disabled:opacity-50"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="h-3 w-3 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          Loading…
        </span>
      ) : (
        <span className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          {label}
        </span>
      )}
    </button>
  );
}
