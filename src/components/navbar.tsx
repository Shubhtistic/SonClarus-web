"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "./logo";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline-soft bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-8">
        <Logo />

        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm-medium text-steel transition-colors hover:text-ink"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-hairline bg-canvas px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm-medium text-steel transition-colors hover:text-ink"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-charcoal"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
