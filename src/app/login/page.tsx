"use client";

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
    <div className="flex flex-1 items-center justify-center bg-surface-canvas-light px-6 py-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-8">
          <p className="micro-cap text-accent-violet-mid">Welcome back</p>
          <h1 className="heading-xl mt-2 text-ink">Sign in to your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="body-md text-ink">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-10 rounded-sm border border-hairline-cool bg-surface-canvas-light px-3 text-body-md text-ink outline-none transition-shadow focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="body-md text-ink">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 rounded-sm border border-hairline-cool bg-surface-canvas-light px-3 text-body-md text-ink outline-none transition-shadow focus:shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)]"
            />
          </label>

          {error && (
            <div className="rounded-sm border border-error/30 bg-error/5 px-3 py-2 text-body-md text-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-cap mt-2 rounded-md bg-primary px-4 py-3 text-on-primary transition-colors hover:bg-charcoal disabled:cursor-not-allowed disabled:bg-hairline-cloud disabled:text-on-dark-muted"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="body-md mt-6 text-center text-on-dark-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-accent-violet underline underline-offset-2"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
