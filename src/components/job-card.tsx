"use client";

import { useEffect, useCallback } from "react";
import { useState } from "react";
import { getDownloadLinks, ApiError, type DownloadFile } from "@/lib/api";

const STATUS_STYLES: Record<string, { chip: string; label: string }> = {
  PENDING_UPLOAD: {
    chip: "rounded-xs bg-surface-elevated px-2 py-0.5 caption-sm text-on-dark-mute",
    label: "Pending",
  },
  QUEUED: {
    chip: "rounded-xs bg-surface-elevated px-2 py-0.5 caption-sm text-on-dark-mute",
    label: "Queued",
  },
  PROCESSING: {
    chip: "rounded-xs bg-accent-blue-soft px-2 py-0.5 caption-sm text-accent-blue",
    label: "Processing",
  },
  COMPLETED: {
    chip: "rounded-xs bg-accent-green-soft px-2 py-0.5 caption-sm text-accent-green",
    label: "Done",
  },
  FAILED: {
    chip: "rounded-xs bg-accent-red-soft px-2 py-0.5 caption-sm text-accent-red",
    label: "Failed",
  },
  EXPIRED: {
    chip: "rounded-xs bg-surface-elevated px-2 py-0.5 caption-sm text-on-dark-mute",
    label: "Expired",
  },
  CANCELLED: {
    chip: "rounded-xs bg-surface-elevated px-2 py-0.5 caption-sm text-on-dark-mute",
    label: "Cancelled",
  },
};

const STAGE_LABELS: Record<string, string> = {
  original: "Original",
  denoise: "Denoise",
  separate: "Separate",
  transcribe: "Transcript",
  summarize: "Summary",
};

export function JobCard({
  job,
  onStatusChange,
}: {
  job: { job_id: string; filename?: string; summary?: string; created_at: string; status: string; completed: boolean; selected_options?: string[] };
  onStatusChange?: (status: string, completed: boolean) => void;
}) {
  const [status, setStatus] = useState<string>(job.status ?? "QUEUED");
  const [completed, setCompleted] = useState(job.completed ?? false);
  const [files, setFiles] = useState<DownloadFile[] | null>(null);

  const poll = useCallback(async () => {
    try {
      const data = await getDownloadLinks(job.job_id);
      setStatus(data.job.status);
      setCompleted(data.job.completed);
      setFiles(data.files);
      onStatusChange?.(data.job.status, data.job.completed);
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        // still processing — keep polling
      }
    }
  }, [job.job_id, onStatusChange]);

  useEffect(() => {
    if (completed) {
      poll();
      return;
    }
    const id = setInterval(poll, 5000);
    poll();
    return () => clearInterval(id);
  }, [completed, poll]);

  const style = STATUS_STYLES[status] ?? STATUS_STYLES.QUEUED;

  const displayName = job.filename || (files && files[0]?.filename) || `Job ${job.job_id.slice(0, 8)}`;
  const subtitle = job.selected_options && job.selected_options.length > 0
    ? job.selected_options.join(" • ")
    : null;

  return (
    <div className="rounded-lg border border-border bg-input p-4 min-w-0">
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="body-sm font-heading-utility font-semibold truncate text-foreground flex-1 min-w-0">
              {displayName}
            </h3>
            <span className={`${style.chip} shrink-0`}>{style.label}</span>
          </div>
          {subtitle && (
            <p className="caption-sm mt-1 font-body text-muted-foreground truncate uppercase tracking-wider">
              {subtitle}
            </p>
          )}
          {job.summary && (
            <p className="body-sm mt-1 font-body line-clamp-2 text-muted-foreground break-words">{job.summary}</p>
          )}
          <p className="caption-sm mt-1.5 font-mono text-muted-foreground">
            {new Date(job.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {completed && files && files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
          {files.map((f) => (
            <DownloadButton key={f.stage} file={f} />
          ))}
        </div>
      )}
    </div>
  );
}

function DownloadButton({ file }: { file: DownloadFile }) {
  const label = STAGE_LABELS[file.stage] ?? file.stage;

  return (
    <a
      href={file.download_url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-md font-body inline-flex items-center gap-2 rounded-md border border-hairline bg-surface-elevated px-3 py-1.5 text-on-dark transition-colors hover:bg-surface hover:border-hairline-strong"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
      </svg>
      {label}
    </a>
  );
}
