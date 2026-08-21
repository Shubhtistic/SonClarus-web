import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 transition-opacity hover:opacity-90">
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm transition-transform group-hover:scale-105">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12V12.01" stroke="#0c0a09" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M8 8V16" stroke="#0c0a09" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 4V20" stroke="#0c0a09" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 8V16" stroke="#0c0a09" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 12V12.01" stroke="#0c0a09" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <span className="text-[20px] font-bold tracking-[-0.03em] text-[#fafaf9]">
        sonclarus
      </span>
    </Link>
  );
}
