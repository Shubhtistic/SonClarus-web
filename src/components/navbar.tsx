"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "./logo";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-hairline-violet bg-surface-night">
      <div className="mx-auto flex h-14 max-w-[1152px] items-center justify-between px-6">
        <Logo />

        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="body-md text-on-dark-muted transition-colors hover:text-on-primary"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="btn-cap-light rounded-xl border border-on-dark-faint bg-on-dark-faint px-4 py-2 text-on-primary transition-colors hover:bg-white/10"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="body-md text-on-dark-muted transition-colors hover:text-on-primary"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="btn-cap rounded-md bg-on-primary px-4 py-2 text-primary transition-colors hover:bg-surface-press-light"
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
