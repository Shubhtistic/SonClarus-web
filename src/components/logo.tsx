import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="#ffffff" />
        <path
          d="M8 19V9l4.5 5L17 9v10"
          stroke="#07080a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-body text-[17px] font-medium tracking-tight text-on-dark">
        sonclarus
      </span>
    </Link>
  );
}
