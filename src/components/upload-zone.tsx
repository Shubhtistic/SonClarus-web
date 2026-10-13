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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["denoise", "separate", "transcribe", "summarize"]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => {
      let next: string[];
      if (prev.includes(option)) {
        next = prev.filter((o) => o !== option);
        if (option === "transcribe") {
          next = next.filter((o) => o !== "summarize");
        }
      } else {
        next = [...prev, option];
        if (option === "summarize" && !next.includes("transcribe")) {
          next.push("transcribe");
        }
      }
      return next;
    });
  };

  const Icons = {
    denoise: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 3v2M12 19v2M5 12H3M21 12h-2M18.36 5.64l-1.42 1.42M7.06 16.94l-1.42 1.42M18.36 18.36l-1.42-1.42M7.06 7.06l-1.42-1.42" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    separate: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 6L9 11" />
        <path d="M20 18L9 13" />
      </svg>
    ),
    transcribe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    summarize: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 8h6M12 12h6M12 16h6" />
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H17a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  };

  const acceptWav = useCallback((file: File) => {
    if (!file.name.endsWith(".wav") && file.type !== "audio/wav") {
      setUpload({ phase: "error", progress: "", error: "Only .wav files are accepted." });
      return;
    }
    setSelectedFile(file);
    setUpload({ phase: "idle", progress: "", error: "" });
    setShowOptions(false);
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
        selected_options: selectedOptions,
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
    <div className={`relative rounded-lg border border-border bg-card p-4 min-w-0 w-full flex flex-col h-[280px] ${hasBottomAction ? "justify-between" : "justify-center"}`}>
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <h3 className="heading-sm mb-2">Configure Processing</h3>
            <p className="caption-sm text-muted-foreground mb-6">
              Select the processing stages for your audio file. Note: <span className="text-primary-blue font-medium">Summarization</span> requires <span className="text-primary-blue font-medium">Transcription</span>.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: "denoise", label: "Denoise" },
                { id: "separate", label: "Separate" },
                { id: "transcribe", label: "Transcribe" },
                { id: "summarize", label: "Summarize" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => toggleOption(id)}
                  className={`flex items-center gap-3 rounded-lg border p-3 text-sm transition-all ${
                    selectedOptions.includes(id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-border-hover"
                  } ${
                    id === "summarize" && !selectedOptions.includes("transcribe")
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {Icons[id as keyof typeof Icons]}
                  {label}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setIsModalOpen(false);
                handleUpload();
              }}
              className="w-full rounded-lg bg-primary h-12 text-primary-foreground font-semibold transition-colors hover:bg-primary/90"
            >
              Start Upload & Processing
            </button>
          </div>
        </div>
      )}

      {hasBottomAction && (
        <div className="h-10 mt-3 flex items-center justify-center w-full">
          {selectedFile && upload.phase === "idle" && !isModalOpen && (
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isUploading}
              className="btn-md font-body rounded-md bg-primary h-10 px-4 text-primary-foreground font-semibold transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 w-full text-center"
            >
              Configure & Upload
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
