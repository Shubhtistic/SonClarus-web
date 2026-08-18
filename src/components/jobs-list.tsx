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
        <div className="py-12 text-center">
          <p className="body-md text-on-dark-muted">Loading jobs…</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-hairline-violet bg-ink-deep py-12 text-center">
          <p className="body-md text-on-dark-muted">No jobs yet.</p>
          <p className="body-md mt-1 text-on-dark-muted/60">
            Upload a .wav file above to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            {jobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="micro-cap text-on-dark-muted">
              {from}–{to} of {total}
            </p>
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={!hasPrev}
                className="btn-cap-light rounded-xl border border-hairline-violet bg-surface-night px-4 py-2 text-on-primary transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={next}
                disabled={!hasNext}
                className="btn-cap-light rounded-xl border border-hairline-violet bg-surface-night px-4 py-2 text-on-primary transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
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
