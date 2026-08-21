use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ username: email, password });
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Login failed. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-8">
          <p className="caption-sm text-foreground-faint">Welcome back</p>
          <h1 className="heading-xl mt-2 text-primary">Sign in to your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="body-sm-strong text-foreground">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-9 rounded-md border border-border bg-input px-3 text-body-md text-foreground outline-none transition-colors focus:border-border-control"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="body-sm-strong text-foreground">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-9 rounded-md border border-border bg-input px-3 text-body-md text-foreground outline-none transition-colors focus:border-border-control"
            />
          </label>

          {error && (
            <div className="rounded-md border border-destructive bg-destructive/20 px-3 py-2 text-body-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-md mt-1 rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="body-md mt-6 text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="link-md text-foreground underline underline-offset-2"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}