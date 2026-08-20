"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Logo } from "./logo";

export function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-3 left-0 right-0 z-50 mx-auto w-[calc(100%-24px)] max-w-[1480px] rounded-full transition-all duration-300 ${
        scrolled
          ? "border border-[#3c3835] bg-[#242120]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          : "border border-transparent bg-transparent"
      }`}
    >
      <nav className="px-5 py-2.5 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo />
          <span className="text-[15px] font-medium tracking-tight text-[#e7e5e4]">
            sonclarus
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-7 ml-auto md:flex">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="text-[14px] text-[#a8a29e] transition-colors hover:text-[#e7e5e4]"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-[14px] text-[#a8a29e] transition-colors hover:text-[#e7e5e4]"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[14px] text-[#a8a29e] transition-colors hover:text-[#e7e5e4]"
              >
                Log in
              </Link>
            </>
          )}
        </div>

        {/* CTA */}
        <Link
          href="/register"
          className="shrink-0 rounded-full border border-[#3c3835] bg-[#383431] px-5 py-2 text-[14px] font-medium text-[#f5f5f4] transition-all hover:bg-[#4a4541] hidden md:block"
        >
          Get started
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-lg p-2 text-[#e7e5e4] md:hidden ml-auto"
          aria-label="Open menu"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Top hairline */}
      <div className="absolute top-0 left-6 right-6 h-px bg-[rgba(120,113,108,0.15)]" />
    </header>
  );
}
