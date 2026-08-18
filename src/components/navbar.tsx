"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "./logo";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <div className="mx-auto flex h-[56px] max-w-[1240px] items-center justify-between px-6">
        <Logo />

        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="body-sm-strong text-on-dark transition-colors hover:text-ink"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="btn-md rounded-md border border-hairline bg-transparent px-4 py-2 text-on-dark transition-colors hover:bg-surface-elevated"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="body-sm-strong text-on-dark transition-colors hover:text-ink"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="btn-md rounded-md bg-primary px-4 py-2 text-on-primary transition-colors hover:bg-primary-pressed"
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
