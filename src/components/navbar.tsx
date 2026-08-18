"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "./logo";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40">
      <div
        className="mx-auto flex h-14 max-w-[1240px] items-center justify-between px-6 relative"
        style={{
          background: "linear-gradient(160deg, rgba(255,87,87,0.08) 0%, rgba(161,19,26,0.03) 60%, transparent 100%)",
          backdropFilter: "blur(12px) saturate(150%)",
          WebkitBackdropFilter: "blur(12px) saturate(150%)",
        }}
      >
        {/* Subtle grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <Logo />

        <nav className="flex items-center gap-2 relative">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-1.5 text-sm text-white/60 transition-all hover:text-white rounded-full"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="px-4 py-1.5 text-sm text-white/40 transition-all hover:text-white/70 rounded-full"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-1.5 text-sm text-white/60 transition-all hover:text-white rounded-full"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="relative ml-2 px-5 py-1.5 text-sm font-medium text-white rounded-full transition-all hover:brightness-110"
                style={{
                  background: "linear-gradient(135deg, rgba(255,87,87,0.25) 0%, rgba(255,87,87,0.08) 100%)",
                  border: "1px solid rgba(255,87,87,0.3)",
                  boxShadow: "0 0 24px rgba(255,87,87,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
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
