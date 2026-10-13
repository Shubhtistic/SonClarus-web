const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface UploadRequest {
  filename: string;
  file_size_bytes: number;
  selected_options: string[];
  content_type: string;
}

export interface PresignedPost {
  url: string;
  fields: Record<string, string>;
}

export interface UploadResponse {
  job_id: string;
  presigned_post: PresignedPost;
}

export interface JobStatus {
  message: string;
  job_id: string;
  status: string;
}

// ---------------------------------------------------------------------------
// Token management
// ---------------------------------------------------------------------------

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sonclarus_token");
}

export function setToken(token: string): void {
  localStorage.setItem("sonclarus_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("sonclarus_token");
}

// ---------------------------------------------------------------------------
// Error class
// ---------------------------------------------------------------------------

export class ApiError extends Error {
  status: number;
  meta?: unknown;
  constructor(status: number, message: string, meta?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.meta = meta;
  }
}

// ---------------------------------------------------------------------------
// Internal fetch wrapper
// ---------------------------------------------------------------------------

interface RequestInit extends globalThis.RequestInit {
  json?: unknown;
  _isRetry?: boolean;
}

interface ApiEnvelope<T> {
  message: string;
  status_code: number;
  data: T;
  meta: unknown;
}

async function request<T>(
  path: string,
  { json, headers: extra, _isRetry, ...init }: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const mergedHeaders: Record<string, string> = {
    "ngrok-skip-browser-warning": "true",
    ...(extra as Record<string, string> | undefined),
  };

  if (token) {
    mergedHeaders["Authorization"] = `Bearer ${token}`;
  }

  let body: BodyInit | undefined;
  if (json !== undefined) {
    mergedHeaders["Content-Type"] = "application/json";
    body = JSON.stringify(json);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...init,
    headers: mergedHeaders,
    body,
  });

  if (res.status === 401 && !_isRetry) {
    try {
      const refreshRes = await fetch(`${API_BASE}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (refreshRes.ok) {
        const envelope = (await refreshRes.json()) as ApiEnvelope<AuthResponse>;
        const newToken = envelope.data.access_token;
        setToken(newToken);
        return request<T>(path, { json, headers: extra, _isRetry: true, ...init });
      }
    } catch {
      // refresh failed — fall through to throw
    }
    clearToken();
    throw new ApiError(401, "Session expired. Please log in again.");
  }

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    let message = text;
    let meta: unknown;
    try {
      const parsed = JSON.parse(text) as {
        message?: string;
        meta?: { errors?: Array<{ msg?: string; loc?: string[] }> };
      };
      if (parsed.meta?.errors && parsed.meta.errors.length > 0) {
        const detailMsgs = parsed.meta.errors
          .map((e) => e.msg)
          .filter(Boolean)
          .join(", ");
        message = detailMsgs || parsed.message || text;
      } else if (parsed.message) {
        message = parsed.message;
      }
      meta = parsed.meta;
    } catch {
      // use raw text
    }
    throw new ApiError(res.status, message, meta);
  }

  if (res.status === 204) return {} as T;

  const envelope = (await res.json()) as ApiEnvelope<T>;
  return envelope.data;
}

// ---------------------------------------------------------------------------
// Auth endpoints
// ---------------------------------------------------------------------------

export async function signup(payload: RegisterRequest): Promise<AuthResponse> {
  return request("/auth/signup", {
    method: "POST",
    json: payload,
    credentials: "include",
  });
}

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  return request("/auth/login", {
    method: "POST",
    json: payload,
    credentials: "include",
  });
}

export async function refresh(): Promise<AuthResponse> {
  return request("/auth/refresh", {
    method: "POST",
    credentials: "include",
    _isRetry: true,
  });
}

export async function logout(): Promise<void> {
  await request("/auth/logout", {
    method: "POST",
    credentials: "include",
  });
}

export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_verified: boolean;
  storage_limit: number;
  storage_used: number;
}

export async function getUserProfile(): Promise<UserProfile> {
  return request("/users/me");
}

export interface UserStats {
  jobs_completed: number;
  jobs_processing: number;
  storage_limit: number;
  storage_used: number;
}

export async function getUserStats(): Promise<UserStats> {
  return request("/users/stats");
}

// ---------------------------------------------------------------------------
// Upload flow
// ---------------------------------------------------------------------------

export async function requestUpload(
  payload: UploadRequest,
): Promise<UploadResponse> {
  return request("/jobs/request-upload", { method: "POST", json: payload });
}

export async function uploadToS3(
  presigned: PresignedPost,
  file: File,
): Promise<void> {
  const formData = new FormData();
  for (const [key, value] of Object.entries(presigned.fields)) {
    formData.append(key, value);
  }
  formData.append("file", file);

  const res = await fetch(presigned.url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text);
  }
}

export async function confirmUpload(jobId: string): Promise<JobStatus> {
  return request(`/jobs/${jobId}/confirm-upload`, { method: "POST" });
}

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

export interface Job {
  job_id: string;
  filename: string;
  summary: string;
  created_at: string;
  status: string;
  completed: boolean;
}

export interface RecentJobItem {
  id: string;
  completed: boolean;
  status: string;
  selected_options: string[];
  created_at: string;
}

export async function getRecentJobs(limit = 10): Promise<RecentJobItem[]> {
  const queryLimit = Math.min(Math.max(limit, 1), 40);
  return request(`/jobs/recent-jobs?limit=${queryLimit}`);
}

// ---------------------------------------------------------------------------
// Health
// ---------------------------------------------------------------------------

export async function getHealth(): Promise<void> {
  await request("/health");
}

export interface DownloadFile {
  stage: string;
  filename: string;
  size_bytes: number | null;
  content_type: string | null;
  download_url: string;
}

export interface DownloadJobSummary {
  job_id: string;
  status: string;
  completed: boolean;
  current_stage: string | null;
  selected_stages: string[];
  failed_stage: string | null;
  created_at: string;
  uploaded_at: string | null;
  updated_at: string | null;
  completed_at: string | null;
}

export interface DownloadLinksResponse {
  job: DownloadJobSummary;
  files: DownloadFile[];
}

export async function getDownloadLinks(jobId: string): Promise<DownloadLinksResponse> {
  return request(`/jobs/${jobId}/download-links`);
}
