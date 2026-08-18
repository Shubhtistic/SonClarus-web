"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
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

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const featuresRef = useRef<HTMLElement>(null);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function scrollToFeatures() {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function handleTerminalAction(action: "upload" | "jobs") {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
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
                  {/* Terminal card */}
                  <div className="relative rounded-xl border border-hairline bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                    {/* Terminal chrome — traffic lights on right */}
                    <div className="flex items-center justify-end gap-2 px-4 py-2.5 border-b border-hairline-soft bg-surface">
                      <span className="body-sm text-mute mr-auto font-mono">sonclarus@audio:~</span>
                      <div className="flex gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
                        <div className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
                        <div className="h-2 w-2 rounded-full bg-[#28c840]/70" />
                      </div>
                    </div>
                    {/* Terminal body */}
                    <div className="p-4 font-mono text-sm">
                      {/* Welcome message */}
                      <div className="mb-3">
                        <span className="text-accent-green">➜</span>
                        <span className="text-accent-blue ml-2">~</span>
                        <span className="text-body ml-2">Welcome to Sonclarus</span>
                      </div>
                      <div className="mb-4">
                        <span className="text-mute">➜</span>
                        <span className="text-body ml-2">Audio separation & transcription pipeline</span>
                      </div>
                      
                      {/* Commands */}
                      <div className="space-y-1.5">
                        {[
                          { cmd: "sonclarus upload", desc: "Upload new audio file", action: "upload" as const, color: "text-accent-blue" },
                          { cmd: "sonclarus jobs", desc: "View processing jobs", action: "jobs" as const, color: "text-accent-green" },
                          { cmd: "sonclarus status", desc: "Check system status", action: null, color: "text-accent-yellow" },
                        ].map((item) => (
                          <div
                            key={item.cmd}
                            onClick={() => item.action && handleTerminalAction(item.action)}
                            className={`flex items-center justify-between rounded px-2 py-1.5 transition-colors ${
                              item.action ? "hover:bg-surface-elevated cursor-pointer" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-accent-green">❯</span>
                              <span className={`body-sm ${item.color}`}>{item.cmd}</span>
                              <span className="caption-sm text-mute ml-2">— {item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Status line */}
                      <div className="mt-4 pt-3 border-t border-hairline-soft flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-green animate-pulse" />
                        <span className="caption-sm text-mute">System ready</span>
                        <span className="caption-sm text-stone ml-auto">v1.0.0</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </FadeIn>
          </div>
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

      {/* ── Shubham's Intro ── */}
      <section className="bg-canvas px-6 py-[var(--spacing-section)]">
        <div className="mx-auto max-w-[1240px]">
          <FadeIn>
            <div className="grid items-start gap-10 lg:grid-cols-2">
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

              {/* Right: social links card with TiltCard effect */}
              <TiltCard intensity={10} className="h-full">
                <div className="rounded-2xl border border-hairline bg-surface p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_4px_24px_rgba(0,0,0,0.3)]">
                  <p className="body-sm-strong text-on-dark mb-4">Connect with me</p>
                  <div className="flex flex-col gap-2.5">
                    <a
                      href="https://github.com/Shubhtistic"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-hairline bg-surface-elevated px-4 py-3 text-body transition-all hover:border-hairline-strong hover:bg-surface"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span className="body-sm">GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/shubhtistic/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-hairline bg-surface-elevated px-4 py-3 text-body transition-all hover:border-hairline-strong hover:bg-surface"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <span className="body-sm">LinkedIn</span>
                    </a>
                    <a
                      href="https://www.instagram.com/shubhtistic/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border border-hairline bg-surface-elevated px-4 py-3 text-body transition-all hover:border-hairline-strong hover:bg-surface"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="body-sm">Instagram</span>
                    </a>
                  </div>
                </div>
              </TiltCard>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
