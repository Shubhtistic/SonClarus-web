"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth-context";
import { ApiError } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register({ email, password, first_name: firstName, last_name: lastName });
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
    <div className="flex flex-1 items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-8">
          <p className="caption-sm text-foreground-faint">Get started</p>
          <h1 className="heading-xl mt-2 font-heading-utility text-primary">Create your account</h1>
          <p className="body-md mt-2 font-body text-muted-foreground">
            100 MB free storage included. No credit card required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="body-sm-strong text-foreground">First name</span>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                className="h-9 rounded-md border border-border bg-input px-3 font-body text-body-md text-foreground outline-none transition-colors focus:border-border-control"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="body-sm-strong text-foreground">Last name</span>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="h-9 rounded-md border border-border bg-input px-3 font-body text-body-md text-foreground outline-none transition-colors focus:border-border-control"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="body-sm-strong text-foreground">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-9 rounded-md border border-border bg-input px-3 font-body text-body-md text-foreground outline-none transition-colors focus:border-border-control"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="body-sm-strong text-foreground">Password</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-9 rounded-md border border-border bg-input px-3 font-body text-body-md text-foreground outline-none transition-colors focus:border-border-control"
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
            className="btn-md mt-1 font-body rounded-md bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="body-md mt-6 font-body text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="link-md text-foreground underline underline-offset-2"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}