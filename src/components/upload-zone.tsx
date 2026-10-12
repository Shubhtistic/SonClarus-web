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
import { addJobToList } from "@/components/jobs-list";

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
        selected_options: ["denoise", "separate", "transcribe", "summarize"],
        content_type: "audio/wav",
      });

      setUpload({ phase: "uploading", progress: "Uploading to S3…", error: "" });
      await uploadToS3(presigned_post, selectedFile);

      setUpload({ phase: "confirming", progress: "Confirming upload…", error: "" });
      await confirmUpload(job_id);

      addJobToList({
        job_id,
        filename: selectedFile.name,
        summary: "",
        created_at: new Date().toISOString(),
        status: "QUEUED",
        completed: false,
      });

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

  const hasBottomAction = !!selectedFile || upload.phase !== "idle";

  return (
    <div className={`rounded-lg border border-border bg-card p-4 min-w-0 w-full flex flex-col h-[280px] ${hasBottomAction ? "justify-between" : "justify-center"}`}>
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
        className={`flex flex-col items-center justify-center gap-2 rounded-md border border-dashed p-3 text-center transition-colors min-w-0 w-full cursor-pointer overflow-hidden ${
          hasBottomAction ? "flex-1" : "h-[248px]"
        } ${
          dragging
            ? "border-primary-blue bg-primary-blue/10"
            : "border-border bg-input"
        }`}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 ${dragging ? "text-primary-blue" : "text-muted-foreground"}`}
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>

        <div className="w-full px-2 min-w-0">
          {selectedFile ? (
            <div className="space-y-0.5 min-w-0">
              <p className="body-sm font-heading-utility font-medium text-foreground break-words text-center line-clamp-2">
                {selectedFile.name}
              </p>
              <p className="caption-sm font-mono text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready
              </p>
              <p className="caption-sm text-primary-blue underline">
                Replace file
              </p>
            </div>
          ) : (
            <>
              <p className="body-sm font-heading-utility font-medium text-foreground">
                {dragging ? "Drop your file here" : "Drag & drop a .wav file"}
              </p>
              <p className="caption-sm mt-0.5 font-body text-muted-foreground">
                or{" "}
                <span className="cursor-pointer font-medium text-primary-blue">
                  browse
                </span>{" "}
                to choose
              </p>
            </>
          )}
        </div>
      </div>

      {hasBottomAction && (
        <div className="h-10 mt-3 flex items-center justify-center w-full">
          {selectedFile && upload.phase === "idle" && (
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="btn-md font-body rounded-md bg-primary h-10 px-4 text-primary-foreground font-semibold transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 w-full text-center"
            >
              Start processing
            </button>
          )}

          {upload.progress && upload.phase !== "idle" && upload.phase !== "done" && (
            <div className="h-10 flex items-center justify-center w-full rounded-md border border-border bg-input px-3">
              <p className="caption-sm font-body text-foreground truncate">{upload.progress}</p>
            </div>
          )}

          {upload.phase === "done" && (
            <div className="h-10 flex items-center justify-center w-full rounded-md border border-primary-green/30 bg-primary-green/10 px-3">
              <p className="caption-sm font-body text-primary-green truncate">{upload.progress}</p>
            </div>
          )}

          {upload.error && (
            <div className="h-10 flex items-center justify-center w-full rounded-md border border-destructive/30 bg-destructive/10 px-3">
              <p className="caption-sm font-body text-destructive truncate">{upload.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
