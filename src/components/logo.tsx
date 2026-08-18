import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="6" fill="#150f23" />
        <path
          d="M8 19V9l4.5 5L17 9v10"
          stroke="#c2ef4e"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="font-display text-[18px] font-bold tracking-tight text-ink"
      >
        sonclarus
      </span>
    </Link>
  );
}
