"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { HeroBackground } from "@/components/3d/hero-bg-lazy";
import { FadeIn, StaggerChildren, TiltCard } from "@/components/interactions";

const FEATURES = [
  {
    color: "#ffc533",
    soft: "rgba(255,197,51,0.12)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
    title: "Two-Speaker Separation",
    description: "Automatically isolate and clean individual speaker tracks from a single audio file.",
  },
  {
    color: "#57c1ff",
    soft: "rgba(87,193,255,0.12)",
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
    description: "Get clean, formatted text transcripts with speaker attribution and timestamps.",
  },
  {
    color: "#59d499",
    soft: "rgba(89,212,153,0.12)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Fast Processing",
    description: "Background processing pipeline returns results in minutes, not hours.",
  },
];

const TECH_STACK = [
  { name: "Python", color: "#57c1ff" },
  { name: "FastAPI", color: "#59d499" },
  { name: "Docker", color: "#ffc533" },
  { name: "AWS", color: "#ff6161" },
  { name: "PostgreSQL", color: "#57c1ff" },
  { name: "Redis", color: "#ff6161" },
];

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function scrollToFeatures() {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] overflow-hidden bg-canvas">
        {/* Red gradient wash at top */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(160deg, rgba(255,87,87,0.10) 0%, rgba(161,19,26,0.05) 40%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        {/* Fade at bottom to blend into next section */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: `linear-gradient(to bottom, transparent, var(--color-canvas))`,
          }}
          aria-hidden="true"
        />
        <HeroBackground isMobile={isMobile} />

        <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-20 pb-32 lg:pt-28 lg:pb-40">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: copy */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-xs border border-hairline bg-surface px-2.5 py-1 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
                <span className="caption-sm text-mute">Powered by AI</span>
              </div>

              <h1 className="hero-display text-ink leading-tight">
                Separate speakers.
                <br />
                Get transcripts.
                <br />
                <span
                  className="inline-block rounded-sm px-1"
                  style={{ background: "rgba(255,87,87,0.15)", color: "#ff6161" }}
                >
                  Done.
                </span>
              </h1>

              <p className="body-lg mt-6 max-w-[480px] text-body">
                Sonclarus uses AI to cleanly split two-speaker audio into isolated
                tracks and generate accurate, readable transcripts — all in one
                pipeline.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/register"
                  className="btn-md rounded-md bg-primary px-5 py-2 text-on-primary transition-all hover:bg-primary-pressed hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  Get started free
                </Link>
                <button
                  onClick={scrollToFeatures}
                  className="btn-md rounded-md border border-hairline bg-transparent px-5 py-2 text-on-dark transition-all hover:bg-surface"
                >
                  Learn more
                </button>
              </div>

              {/* Keycap hint */}
              <div className="mt-7 flex items-center gap-3">
                <kbd className="inline-flex h-6 items-center rounded-xs border border-hairline bg-surface-card px-2.5 text-keycap text-body shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  ⌘ K
                </kbd>
                <span className="caption-md text-mute">Quick upload shortcut</span>
              </div>
            </FadeIn>

            {/* Right: command palette mockup — with TiltCard */}
            <FadeIn delay={0.15}>
              <TiltCard intensity={10} className="h-full">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative h-full"
                >
                  {/* Glow behind card */}
                  <div
                    className="absolute -inset-4 rounded-2xl blur-2xl"
                    style={{ background: "rgba(87,193,255,0.08)" }}
                    aria-hidden="true"
                  />
                  {/* Card */}
                  <div className="relative rounded-xl border border-hairline bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                    {/* macOS traffic light window chrome */}
                    <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                        <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                        <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                      </div>
                      <div className="flex-1 rounded-sm bg-surface-elevated px-3 py-1 text-center text-caption-md text-mute">
                        sonclarus://upload
                      </div>
                    </div>
                    {/* Palette body */}
                    <div className="p-3">
                      <div className="flex items-center gap-2 rounded-sm border border-hairline bg-surface-elevated px-3 py-2.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-mute">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" x2="16.65" y1="21" y2="16.65" />
                        </svg>
                        <span className="body-sm text-body">Upload audio…</span>
                        <kbd className="ml-auto keycap text-mute">⌘ P</kbd>
                      </div>
                      <div className="mt-1.5 flex flex-col gap-0.5">
                        {[
                          { label: "Upload new file", shortcut: "⏎", color: "#57c1ff" },
                          { label: "View my jobs", shortcut: "⇧ J", color: "#59d499" },
                          { label: "Settings", shortcut: "⌘ ,", color: "#ffc533" },
                        ].map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between rounded-sm px-2.5 py-1.5 transition-colors hover:bg-surface-card"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: item.color }}
                              />
                              <span className="body-sm text-on-dark">{item.label}</span>
                            </div>
                            <kbd className="keycap text-mute">{item.shortcut}</kbd>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Bottom hint */}
                    <div className="flex items-center justify-between border-t border-hairline-soft px-4 py-2.5">
                      <span className="caption-sm text-mute">Sonclarus v1.0</span>
                      <div className="flex gap-1">
                        <kbd className="keycap text-mute">↑</kbd>
                        <kbd className="keycap text-mute">↓</kbd>
                        <span className="caption-sm text-mute ml-1">to navigate</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Shubham's Intro ── */}
      <section className="bg-canvas px-6 py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[1240px]">
          <FadeIn>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              {/* Left: text */}
              <div>
                <p className="caption-sm text-mute mb-2">About the creator</p>
                <h2 className="heading-xl text-ink">
                  Hi there, I&apos;m{" "}
                  <span style={{ color: "#57c1ff" }}>Shubham</span>
                </h2>
                <p className="body-lg mt-4 text-body">
                  Backend Engineer building scalable systems with Python, FastAPI, Docker, and AWS.
                  I architect APIs from the ground up — designing efficient data models, implementing
                  async processing, and deploying containerized services that handle real-world load.
                </p>
                <p className="body-md mt-4 text-mute">
                  Sonclarus is my passion project — a cloud-native audio intelligence platform that
                  combines DeepFilterNet, SepFormer, and Faster-Whisper into a single seamless pipeline.
                </p>
              </div>

              {/* Right: tech stack */}
              <div>
                <div className="rounded-xl border border-hairline bg-surface p-6">
                  <p className="body-sm-strong text-on-dark mb-4">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {TECH_STACK.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-surface-elevated px-3 py-1.5 text-caption-md text-body"
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ background: tech.color }}
                        />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-3">
                    <a
                      href="https://github.com/Shubhtistic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-md rounded-md border border-hairline bg-transparent px-4 py-2 text-on-dark transition-all hover:bg-surface"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/shubhtistic/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-md rounded-md border border-hairline bg-transparent px-4 py-2 text-on-dark transition-all hover:bg-surface"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/shubhtistic/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-md rounded-md border border-hairline bg-transparent px-4 py-2 text-on-dark transition-all hover:bg-surface"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Features ── */}
      <section ref={featuresRef} id="features" className="bg-canvas px-6 py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[1240px]">
          <FadeIn>
            <div className="mb-10 text-center">
              <p className="caption-sm text-mute">Features</p>
              <h2 className="heading-xl mt-2 text-ink">Built for clarity</h2>
              <p className="body-lg mt-3 max-w-[520px] text-body mx-auto">
                Three capabilities that make audio processing effortless.
              </p>
            </div>
          </FadeIn>

          <StaggerChildren gap={0.08} className="grid gap-4 md:grid-cols-3">
            {FEATURES.map((f) => (
              <TiltCard key={f.title} intensity={12} className="h-full">
                <div
                  className="flex h-full flex-col rounded-lg border border-hairline bg-surface p-6"
                  style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.3)" }}
                >
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-md"
                    style={{ background: f.soft }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {f.icon}
                    </svg>
                  </div>
                  <h3 className="heading-sm text-on-dark">{f.title}</h3>
                  <p className="body-sm mt-2 flex-1 text-body">{f.description}</p>
                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-1 w-6 rounded-full" style={{ background: f.color, opacity: 0.7 }} />
                    <span className="caption-sm text-mute">Core feature</span>
                  </div>
                </div>
              </TiltCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="bg-canvas px-6 py-[var(--spacing-section)]">
        <FadeIn>
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="display-lg text-ink">
              Ready to separate your audio?
            </h2>
            <p className="body-lg mt-4 text-body">
              Create a free account and process your first file in minutes.
            </p>
            <Link
              href="/register"
              className="btn-md mx-auto mt-8 inline-block rounded-md bg-primary px-6 py-2 text-on-primary transition-all hover:bg-primary-pressed hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              Start processing
            </Link>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
