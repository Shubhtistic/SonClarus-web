"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "./logo";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06]">
      <div
        className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-6"
        style={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
        }}
      >
        <Logo />

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-all hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="rounded-full px-4 py-1.5 text-sm text-white/50 transition-all hover:text-white/80"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-4 py-1.5 text-sm text-white/70 transition-all hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="relative ml-2 rounded-full px-5 py-1.5 text-sm font-medium text-white transition-all hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 0 20px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
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
