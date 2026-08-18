const API_BASE = "https://api.shubhampawar.in";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface AuthResponse {
  access_token: string;
  token_type?: string;
}

export interface UploadRequest {
  filename: string;
  file_size_bytes: number;
}

export interface PresignedPost {
  url: string;
  fields: Record<string, string>;
}

export interface UploadResponse {
  job_id: string;
  presigned_post: PresignedPost;
}

export type JobStatusValue = "PENDING" | "PROCESSING" | "DONE" | "FAILED";

export interface JobStatus {
  job_id: string;
  status: JobStatusValue;
  summary?: string;
}

export interface Job {
  job_id: string;
  filename: string;
  summary: string;
  created_at: string;
  status?: JobStatusValue;
}

export interface JobsResponse {
  data: Job[];
  total: number;
}

export type DownloadStage = "separated1" | "separated2" | "transcribe";

export interface DownloadResponse {
  download_url: string;
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
// Internal fetch wrapper
// ---------------------------------------------------------------------------

interface RequestInit extends globalThis.RequestInit {
  json?: unknown;
}

async function request<T>(
  path: string,
  { json, headers: extra, ...init }: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const mergedHeaders: Record<string, string> = {
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
    ...init,
    headers: mergedHeaders,
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text);
  }

  return res.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Error class
// ---------------------------------------------------------------------------

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// ---------------------------------------------------------------------------
// Auth endpoints
// ---------------------------------------------------------------------------

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  const body = new URLSearchParams({
    username: payload.username,
    password: payload.password,
  });

  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers,
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text);
  }

  return res.json() as Promise<AuthResponse>;
}

export async function register(
  payload: RegisterRequest,
): Promise<{ id: string }> {
  return request("/register", { method: "POST", json: payload });
}

export async function logout(): Promise<void> {
  await request("/logout", { method: "POST" });
}

// ---------------------------------------------------------------------------
// Upload flow
// ---------------------------------------------------------------------------

export async function requestUpload(
  payload: UploadRequest,
): Promise<UploadResponse> {
  return request("/uploads/request", { method: "POST", json: payload });
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

export async function confirmUpload(jobId: string): Promise<void> {
  await request(`/uploads/confirm/${jobId}`, { method: "POST" });
}

// ---------------------------------------------------------------------------
// Jobs
// ---------------------------------------------------------------------------

export async function getJobs(params: {
  skip?: number;
  limit?: number;
  sort?: "asc" | "desc";
}): Promise<JobsResponse> {
  const query = new URLSearchParams();
  if (params.skip !== undefined) query.set("skip", String(params.skip));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  if (params.sort) query.set("sort", params.sort);

  return request(`/jobs?${query.toString()}`);
}

export async function getJobStatus(jobId: string): Promise<JobStatus> {
  return request(`/status/${jobId}`);
}

export async function getDownloadUrl(
  jobId: string,
  stage: DownloadStage,
): Promise<DownloadResponse> {
  return request(`/download/${jobId}?stage=${stage}`);
}
