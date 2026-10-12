"use client";

import { useEffect, useState } from "react";
import { getDownloadLinks, type Job } from "@/lib/api";
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
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    setJobs(getStoredJobs());
  }, [refreshKey]);

  const updateJobStatus = (jobId: string, status: string, completed: boolean) => {
    setJobs((prev) => {
      const updated = prev.map((j) =>
        j.job_id === jobId ? { ...j, status, completed } : j
      );
      saveJobs(updated);
      return updated;
    });
  };

  if (jobs.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-hairline bg-surface py-10 text-center">
        <p className="body-md font-body text-body">No jobs yet.</p>
        <p className="body-sm mt-1 font-body text-mute">
          Upload a .wav file to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
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
