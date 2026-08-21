"use client";

import { useCallback, useEffect, useState } from "react";
import { getJobs, type Job } from "@/lib/api";
import { JobCard } from "./job-card";

const PAGE_SIZE = 10;

export function JobsList({ refreshKey }: { refreshKey: number }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchJobs = useCallback(async (offset: number) => {
    setLoading(true);
    try {
      const res = await getJobs({
        skip: offset,
        limit: PAGE_SIZE,
        sort: "desc",
      });
      setJobs(res.data);
      setTotal(res.total);
    } catch {
      // keep stale data on transient errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs(0);
    }, 0);
    return () => clearTimeout(timer);
  }, [refreshKey, fetchJobs]);

  function prev() {
    const next = Math.max(0, skip - PAGE_SIZE);
    setSkip(next);
    fetchJobs(next);
  }

  function next() {
    const next = skip + PAGE_SIZE;
    setSkip(next);
    fetchJobs(next);
  }

  const hasPrev = skip > 0;
  const hasNext = skip + PAGE_SIZE < total;
  const from = skip + 1;
  const to = Math.min(skip + PAGE_SIZE, total);

  return (
    <div>
      {loading && jobs.length === 0 ? (
        <div className="py-10 text-center">
          <p className="body-md text-mute">Loading jobs…</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-hairline bg-surface py-10 text-center">
          <p className="body-md text-body">No jobs yet.</p>
          <p className="body-sm mt-1 text-mute">
            Upload a .wav file above to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="caption-sm text-mute">
              {from}–{to} of {total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={!hasPrev}
                className="btn-md rounded-md border border-hairline bg-transparent px-3 py-1.5 text-on-dark transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={next}
                disabled={!hasNext}
                className="btn-md rounded-md border border-hairline bg-transparent px-3 py-1.5 text-on-dark transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
