import Link from "next/link";

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
    title: "Two-Speaker Separation",
    description:
      "Automatically isolate and clean individual speaker tracks from a single audio file.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
    title: "Accurate Transcription",
    description:
      "Get clean, formatted text transcripts with speaker attribution and timestamps.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Fast Processing",
    description:
      "Background processing pipeline returns results in minutes, not hours.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="px-8 pt-[var(--spacing-hero)] pb-[var(--spacing-section-lg)]">
        <div className="mx-auto max-w-[800px] text-center">
          <h1 className="hero-display text-ink">
            Upload audio, separate
            <br />
            speakers, and get full
            <br />
            text transcripts.
          </h1>

          <p className="subtitle mt-6 text-steel">
            Sonclarus uses AI to cleanly split two-speaker audio into isolated
            tracks and generate accurate, readable transcripts — all in one
            pipeline.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-charcoal"
            >
              Get started free
            </Link>
            <a
              href="#features"
              className="rounded-full border border-ink px-8 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-8 pb-[var(--spacing-section-lg)]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 text-center">
            <h2 className="heading-lg text-ink">Built for clarity</h2>
            <p className="subtitle mt-3 text-steel">
              Three capabilities that make audio processing effortless.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-surface p-8 transition-shadow hover:shadow-[0_4px_6px_rgba(0,0,0,0.08)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-canvas text-ink">
                  {f.icon}
                </div>
                <h3 className="card-title text-ink">{f.title}</h3>
                <p className="body-sm mt-2 text-steel">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="px-8 pb-[var(--spacing-section-lg)]">
        <div className="mx-auto max-w-[1280px] rounded-hero bg-primary px-8 py-[var(--spacing-section)] text-center">
          <h2 className="display-lg text-on-dark">
            Ready to separate your audio?
          </h2>
          <p className="subtitle mt-4 text-on-dark/70">
            Create a free account and process your first file in minutes.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-full bg-on-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Start processing
          </Link>
        </div>
      </section>
    </>
  );
}
