"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "./logo";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40">
      <div
        className="h-11 flex items-center gap-3 px-6 relative"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px) saturate(200%)",
          WebkitBackdropFilter: "blur(20px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          paddingRight: 24,
          paddingLeft: 24,
          boxSizing: "border-box",
        }}
      >
        {/* Subtle gradient wash */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: "linear-gradient(160deg, rgba(255,87,87,0.12) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1240px] mx-auto w-full flex items-center gap-3 px-6 relative">
          <Logo />

          <div
            className="w-px h-5 bg-white/10 shrink-0"
            aria-hidden="true"
          />

          <nav className="flex items-center gap-1 relative ml-auto">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="px-3 py-1 text-sm text-white/60 transition-all hover:text-white rounded-full"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm text-white/40 transition-all hover:text-white/70 rounded-full"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-1 text-sm text-white/60 transition-all hover:text-white rounded-full"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="ml-1 px-4 py-1 text-sm font-medium text-white rounded-full transition-all hover:brightness-125"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,87,87,0.35) 0%, rgba(255,87,87,0.12) 100%)",
                    border: "1px solid rgba(255,87,87,0.35)",
                    boxShadow: "0 0 16px rgba(255,87,87,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  Get started
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
