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
  localStorage.removeItem("sonclarus_refresh_token");
}

export function setRefreshToken(token: string): void {
  localStorage.setItem("sonclarus_refresh_token", token);
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

  // Handle No Content (204)
  if (res.status === 204) return {} as T;

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

export interface JobsResponse {
  data: Job[];
  total: number;
}

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

export interface DownloadFile {
  stage: string;
  filename: string;
  s3_bucket: string;
  s3_key: string;
  download_url: string;
  size_bytes: number | null;
  content_type: string | null;
}

export interface DownloadLinksResponse {
  job: {
    job_id: string;
    status: string;
    completed: boolean;
  };
  files: DownloadFile[];
}

export async function getDownloadLinks(jobId: string): Promise<DownloadLinksResponse> {
  return request(`/jobs/${jobId}/download-links`);
}
