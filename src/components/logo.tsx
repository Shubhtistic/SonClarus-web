import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
      >
        <rect width="28" height="28" rx="8" fill="#0a0a0a" />
        <path
          d="M8 19V9l4.5 5L17 9v10"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-ink">
        Sonclarus
      </span>
    </Link>
  );
}
