"use client";

import { useEffect, useState } from "react";
import { getDownloadLinks, getRecentJobs, type Job, type RecentJobItem } from "@/lib/api";
import { JobCard } from "./job-card";

function getStoredJobs(): Job[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("sonclarus_jobs");
    return raw ? (JSON.parse(raw) as Job[]) : [];
  } catch {
    return [];
  }
}

function saveJobs(jobs: Job[]): void {
  try {
    localStorage.setItem("sonclarus_jobs", JSON.stringify(jobs));
  } catch {
    // ignore
  }
}

export function addJobToList(job: Job): void {
  const existing = getStoredJobs();
  const already = existing.find((j) => j.job_id === job.job_id);
  if (!already) {
    saveJobs([job, ...existing]);
  }
}

export function JobsList({ refreshKey }: { refreshKey: number }) {
  const [jobs, setJobs] = useState<
    Array<{
      job_id: string;
      filename?: string;
      summary?: string;
      created_at: string;
      status: string;
      completed: boolean;
      selected_options?: string[];
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getRecentJobs(10)
      .then((backendJobs: RecentJobItem[]) => {
        if (!isMounted) return;

        const stored = getStoredJobs();
        const storedMap = new Map(stored.map((j) => [j.job_id, j]));

        const mappedBackend = backendJobs.map((bj) => {
          const match = storedMap.get(bj.id);
          return {
            job_id: bj.id,
            filename: match?.filename,
            summary: match?.summary,
            created_at: bj.created_at,
            status: bj.status,
            completed: bj.completed,
            selected_options: bj.selected_options,
          };
        });

        // Also include any local jobs that might not have landed in backend yet
        const backendIds = new Set(backendJobs.map((b) => b.id));
        const localOnly = stored.filter((s) => !backendIds.has(s.job_id));

        setJobs([...localOnly, ...mappedBackend]);
      })
      .catch(() => {
        if (isMounted) {
          setJobs(getStoredJobs());
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [refreshKey]);

  const updateJobStatus = (jobId: string, status: string, completed: boolean) => {
    setJobs((prev) => {
      const updated = prev.map((j) =>
        j.job_id === jobId ? { ...j, status, completed } : j
      );
      saveJobs(
        updated.map((u) => ({
          job_id: u.job_id,
          filename: u.filename || "",
          summary: u.summary || "",
          created_at: u.created_at,
          status: u.status,
          completed: u.completed,
        }))
      );
      return updated;
    });
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="h-[240px] flex items-center justify-center">
        <p className="caption-sm text-muted-foreground">Loading recent jobs…</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-input py-12 px-4 text-center h-[240px] flex flex-col items-center justify-center">
        <p className="body-md font-body text-foreground">No jobs yet.</p>
        <p className="body-sm mt-1 font-body text-muted-foreground">
          Upload a .wav file to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto pr-1">
      {jobs.map((job) => (
        <JobCard
          key={job.job_id}
          job={job}
          onStatusChange={(status, completed) =>
            updateJobStatus(job.job_id, status, completed)
          }
        />
      ))}
    </div>
  );
}

export { getDownloadLinks };
