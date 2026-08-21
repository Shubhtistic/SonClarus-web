"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-lg font-bold text-[#fafaf9]">
        sonclarus
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/login" className="text-[#e7e5e4] hover:text-[#fafaf9] text-[15px]">
          Log in
        </Link>
        <Link
          href="/register"
          className="rounded-full border border-[#3c3835] bg-[#383431] px-5 py-2 text-[15px] font-medium text-[#fafaf9] hover:bg-[#4a4541]"
        >
          Get started
        </Link>
      </nav>
    </header>
  );
}
