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
    <div className="flex flex-1 items-center justify-center px-8 py-16">
      <div className="w-full max-w-[400px]">
        <h1 className="heading-md text-ink">Create your account</h1>
        <p className="body-sm mt-2 text-steel">
          100 MB free storage included. No credit card required.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm-medium text-charcoal">Full name</span>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jane Doe"
              className="h-10 rounded-md border border-hairline bg-canvas px-3 text-body-md text-ink outline-none transition-[border-color] focus:border-2 focus:border-brand-blue-deep"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm-medium text-charcoal">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-10 rounded-md border border-hairline bg-canvas px-3 text-body-md text-ink outline-none transition-[border-color] focus:border-2 focus:border-brand-blue-deep"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm-medium text-charcoal">Password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-10 rounded-md border border-hairline bg-canvas px-3 text-body-md text-ink outline-none transition-[border-color] focus:border-2 focus:border-brand-blue-deep"
            />
          </label>

          {error && (
            <div className="rounded-md border border-error/30 bg-error/5 px-3 py-2 text-sm text-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-charcoal disabled:cursor-not-allowed disabled:bg-hairline disabled:text-muted"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="body-sm mt-6 text-center text-steel">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-ink underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
