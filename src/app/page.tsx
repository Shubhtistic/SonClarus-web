import Link from "next/link";

const FEATURES = [
  {
    color: "accent-yellow",
    soft: "accent-yellow-soft",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    color: "accent-blue",
    soft: "accent-blue-soft",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    color: "accent-green",
    soft: "accent-green-soft",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      {/* ── Hero stripe band ── */}
      <section className="relative overflow-hidden bg-canvas px-6 pb-0 pt-0">
        {/* Red diagonal stripe gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, rgba(255,87,87,0.12) 0%, rgba(161,19,26,0.08) 50%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1240px] pt-[var(--spacing-section)] pb-[var(--spacing-section)]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="caption-sm text-mute mb-4">
                <span className="inline-block rounded-xs bg-accent-blue-soft px-2 py-0.5 text-accent-blue">
                  New
                </span>
              </p>
              <h1 className="hero-display text-ink">
                Separate speakers.
                <br />
                Get transcripts.
                <br />
                <span className="text-on-dark">Done.</span>
              </h1>
              <p className="body-lg mt-6 text-body">
                Sonclarus uses AI to cleanly split two-speaker audio into isolated
                tracks and generate accurate, readable transcripts — all in one
                pipeline.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <Link
                  href="/register"
                  className="btn-md rounded-md bg-primary px-4 py-2 text-on-primary transition-colors hover:bg-primary-pressed"
                >
                  Get started free
                </Link>
                <a
                  href="#features"
                  className="btn-md rounded-md border border-hairline bg-transparent px-4 py-2 text-on-dark transition-colors hover:bg-surface"
                >
                  Learn more
                </a>
              </div>

              {/* Keycap hint */}
              <div className="mt-6 flex items-center gap-2">
                <kbd className="inline-flex h-5 items-center rounded-xs border border-hairline bg-surface-card px-2 py-0.5 text-keycap text-body">
                  ⌘ K
                </kbd>
                <span className="caption-md text-mute">Quick upload</span>
              </div>
            </div>

            {/* Command palette mockup */}
            <div className="rounded-xl border border-hairline bg-surface p-0">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-stone" />
                  <div className="h-2.5 w-2.5 rounded-full bg-stone" />
                  <div className="h-2.5 w-2.5 rounded-full bg-stone" />
                </div>
                <div className="flex-1 rounded-sm bg-surface-elevated px-3 py-1 text-caption-md text-mute">
                  sonclarus://upload
                </div>
              </div>
              {/* Palette body */}
              <div className="p-3">
                <div className="flex items-center gap-2 rounded-sm bg-surface-elevated px-3 py-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mute">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" x2="16.65" y1="21" y2="16.65" />
                  </svg>
                  <span className="body-sm text-body">Upload audio...</span>
                </div>
                <div className="mt-2 flex flex-col gap-0.5">
                  {[
                    { label: "Upload new file", shortcut: "⏎" },
                    { label: "View my jobs", shortcut: "⇧ J" },
                    { label: "Settings", shortcut: "⌘ ," },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between rounded-sm px-2 py-1.5"
                    >
                      <span className="body-sm text-on-dark">{item.label}</span>
                      <kbd className="keycap text-mute">{item.shortcut}</kbd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features (dark, no stripe) ── */}
      <section id="features" className="bg-canvas px-6 py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10">
            <p className="caption-sm text-mute">Features</p>
            <h2 className="heading-xl mt-2 text-ink">Built for clarity</h2>
            <p className="body-lg mt-3 text-body">
              Three capabilities that make audio processing effortless.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-hairline bg-surface p-6"
              >
                <div
                  className={`mb-4 flex h-9 w-9 items-center justify-center rounded-md ${f.soft} text-${f.color}`}
                >
                  {f.icon}
                </div>
                <h3 className="heading-sm text-on-dark">{f.title}</h3>
                <p className="body-sm mt-2 text-body">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band (dark, no stripe) ── */}
      <section className="bg-canvas px-6 py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="display-lg text-ink">
            Ready to separate your audio?
          </h2>
          <p className="body-lg mt-4 text-body">
            Create a free account and process your first file in minutes.
          </p>
          <Link
            href="/register"
            className="btn-md mx-auto mt-8 inline-block rounded-md bg-primary px-5 py-2 text-on-primary transition-colors hover:bg-primary-pressed"
          >
            Start processing
          </Link>
        </div>
      </section>
    </>
  );
}
