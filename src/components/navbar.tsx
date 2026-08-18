"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "./logo";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-canvas/80 backdrop-blur-md border-b border-hairline">
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-6">
        <Logo />

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="btn-md rounded-md px-4 py-2 text-on-dark transition-colors hover:bg-surface"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="btn-md rounded-md px-4 py-2 text-mute transition-colors hover:text-on-dark"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="btn-md rounded-md px-4 py-2 text-on-dark transition-colors hover:bg-surface"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="btn-md rounded-md bg-primary ml-2 px-4 py-2 text-on-primary transition-all hover:bg-primary-pressed"
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
