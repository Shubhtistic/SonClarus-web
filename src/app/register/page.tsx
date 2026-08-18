"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ email, password, full_name: fullName });
      router.push("/login");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message || "Registration failed. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-canvas px-6 py-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-8">
          <p className="caption-sm text-mute">Get started</p>
          <h1 className="heading-xl mt-2 text-ink">Create your account</h1>
          <p className="body-md mt-2 text-body">
            100 MB free storage included. No credit card required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="body-sm-strong text-on-dark">Full name</span>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              className="h-9 rounded-md border border-hairline bg-surface-elevated px-3 text-body-md text-on-dark outline-none transition-colors focus:border-hairline-strong"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="body-sm-strong text-on-dark">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-9 rounded-md border border-hairline bg-surface-elevated px-3 text-body-md text-on-dark outline-none transition-colors focus:border-hairline-strong"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="body-sm-strong text-on-dark">Password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-9 rounded-md border border-hairline bg-surface-elevated px-3 text-body-md text-on-dark outline-none transition-colors focus:border-hairline-strong"
            />
          </label>

          {error && (
            <div className="rounded-md border border-hairline bg-accent-red-soft px-3 py-2 text-body-sm text-accent-red">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-md mt-1 rounded-md bg-primary px-4 py-2 text-on-primary transition-colors hover:bg-primary-pressed disabled:cursor-not-allowed disabled:bg-surface-elevated disabled:text-ash"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="body-md mt-6 text-center text-body">
          Already have an account?{" "}
          <Link
            href="/login"
            className="link-md text-on-dark underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
