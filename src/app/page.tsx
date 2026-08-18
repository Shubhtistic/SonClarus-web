import Link from "next/link";

const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      {/* ── Hero (dark) ── */}
      <section className="bg-surface-night px-6 pt-[var(--spacing-section)] pb-[var(--spacing-xxl)]">
        <div className="mx-auto max-w-[800px] text-center">
          <p className="mb-5 text-center">
            <span className="micro-cap rounded-xs bg-accent-lime px-3 py-0.5 text-ink-deep">
              AI-Powered
            </span>
          </p>

          <h1 className="hero-display text-on-primary">
            Upload audio, separate
            <br />
            speakers, and get
            <br />
            <span className="inline-block bg-accent-lime px-2 py-0 text-ink-deep">
              full transcripts
            </span>
            .
          </h1>

          <p className="body-lg mt-8 text-on-dark-muted">
            Sonclarus uses AI to cleanly split two-speaker audio into isolated
            tracks and generate accurate, readable transcripts — all in one
            pipeline.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/register"
              className="btn-cap rounded-md bg-on-primary px-5 py-3 text-primary transition-colors hover:bg-surface-press-light"
            >
              Get started free
            </Link>
            <a
              href="#features"
              className="btn-cap-light rounded-xl border border-on-dark-faint bg-on-dark-faint px-5 py-3 text-on-primary transition-colors hover:bg-white/10"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      {/* ── Features (light) ── */}
      <section id="features" className="bg-surface-canvas-light px-6 pb-[var(--spacing-section)]">
        <div className="mx-auto max-w-[1152px]">
          <div className="mb-12 text-center">
            <p className="micro-cap text-accent-violet-mid">Features</p>
            <h2 className="heading-xl mt-3 text-ink">Built for clarity</h2>
            <p className="body-lg mx-auto mt-4 max-w-[560px] text-on-dark-muted">
              Three capabilities that make audio processing effortless.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-hairline-cloud bg-surface-canvas-light p-6 transition-shadow hover:shadow-[0_10px_15px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-surface-night text-accent-lime">
                  {f.icon}
                </div>
                <h3 className="heading-sm text-ink">{f.title}</h3>
                <p className="body-md mt-2 text-on-dark-muted">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band (dark) ── */}
      <section className="bg-surface-night px-6 pb-[var(--spacing-section)]">
        <div className="mx-auto max-w-[1152px] rounded-xxl bg-ink-deep px-6 py-[var(--spacing-section)] text-center">
          <h2 className="display-large text-on-primary">
            Ready to separate your audio?
          </h2>
          <p className="body-lg mt-4 text-on-dark-muted">
            Create a free account and process your first file in minutes.
          </p>
          <Link
            href="/register"
            className="btn-cap mx-auto mt-8 inline-block rounded-md bg-accent-lime px-6 py-3 text-ink-deep transition-colors hover:bg-lime-300"
          >
            Start processing
          </Link>
        </div>
      </section>
    </>
  );
}
