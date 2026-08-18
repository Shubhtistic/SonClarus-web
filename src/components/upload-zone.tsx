"use client";

import {
  useCallback,
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
} from "react";
import {
  confirmUpload,
  requestUpload,
  uploadToS3,
  ApiError,
} from "@/lib/api";

interface UploadState {
  phase: "idle" | "requesting" | "uploading" | "confirming" | "done" | "error";
  progress: string;
  error: string;
}

export function UploadZone({ onUploadComplete }: { onUploadComplete: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [upload, setUpload] = useState<UploadState>({
    phase: "idle",
    progress: "",
    error: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const acceptWav = useCallback((file: File) => {
    if (!file.name.endsWith(".wav") && file.type !== "audio/wav") {
      setUpload({ phase: "error", progress: "", error: "Only .wav files are accepted." });
      return;
    }
    setSelectedFile(file);
    setUpload({ phase: "idle", progress: "", error: "" });
  }, []);

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) acceptWav(file);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) acceptWav(file);
  }

  async function handleUpload() {
    if (!selectedFile) return;

    try {
      setUpload({ phase: "requesting", progress: "Requesting upload link…", error: "" });
      const { job_id, presigned_post } = await requestUpload({
        filename: selectedFile.name,
        file_size_bytes: selectedFile.size,
      });

      setUpload({ phase: "uploading", progress: "Uploading to S3…", error: "" });
      await uploadToS3(presigned_post, selectedFile);

      setUpload({ phase: "confirming", progress: "Confirming upload…", error: "" });
      await confirmUpload(job_id);

      setUpload({ phase: "done", progress: "Upload complete! File is now processing.", error: "" });
      setSelectedFile(null);
      onUploadComplete();
    } catch (err) {
      const msg =
        err instanceof ApiError ? err.message : "An unexpected error occurred.";
      setUpload({ phase: "error", progress: "", error: msg });
    }
  }

  function onBrowseClick() {
    inputRef.current?.click();
  }

  const isUploading = upload.phase !== "idle" && upload.phase !== "done" && upload.phase !== "error";

  return (
    <div className="rounded-xxl border border-hairline-violet bg-ink-deep p-6">
      <input
        ref={inputRef}
        type="file"
        accept=".wav,audio/wav"
        className="hidden"
        onChange={onChange}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={onBrowseClick}
        onKeyDown={(e) => e.key === "Enter" && onBrowseClick()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed py-12 text-center transition-colors ${
          dragging
            ? "border-accent-lime bg-accent-lime/10"
            : "border-hairline-violet bg-surface-night"
        }`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={dragging ? "text-accent-lime" : "text-on-dark-muted"}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>

        <div>
          <p className="body-md font-medium text-on-primary">
            {dragging ? "Drop your file here" : "Drag & drop a .wav file"}
          </p>
          <p className="body-md mt-1 text-on-dark-muted">
            or{" "}
            <span
              onClick={onBrowseClick}
              className="cursor-pointer font-medium text-accent-lime"
            >
              browse
            </span>{" "}
            to choose
          </p>
        </div>
      </div>

      {selectedFile && upload.phase === "idle" && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-hairline-violet bg-surface-night px-4 py-3">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-lime">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            <div>
              <p className="body-md font-medium text-on-primary">{selectedFile.name}</p>
              <p className="caption text-on-dark-muted">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="btn-cap rounded-md bg-accent-lime px-4 py-2.5 text-ink-deep transition-colors hover:bg-lime-300 disabled:cursor-not-allowed disabled:bg-hairline-cloud disabled:text-on-dark-muted"
          >
            {isUploading ? "Uploading…" : "Start processing"}
          </button>
        </div>
      )}

      {upload.progress && upload.phase !== "idle" && upload.phase !== "done" && (
        <div className="mt-4 rounded-xl border border-accent-violet-mid/40 bg-accent-violet-deep/30 px-4 py-3">
          <p className="body-md text-on-primary">{upload.progress}</p>
        </div>
      )}

      {upload.phase === "done" && (
        <div className="mt-4 rounded-xl border border-accent-lime/40 bg-accent-lime/10 px-4 py-3">
          <p className="body-md text-accent-lime">{upload.progress}</p>
        </div>
      )}

      {upload.error && (
        <div className="mt-4 rounded-xl border border-error/30 bg-error/10 px-4 py-3">
          <p className="body-md text-error">{upload.error}</p>
        </div>
      )}
    </div>
  );
}
