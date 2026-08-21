"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Terminal from "@/components/Terminal";
import { FadeIn, StaggerChildren, TiltCard } from "@/components/interactions";
import { HeroBackground } from "@/components/3d/hero-bg-lazy";

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

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  function scrollToFeatures() {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1 } });
      
      tl.to(".hero-word", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        delay: 0.2
      })
      .fromTo(".hero-sub", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0 }, 
        "-=0.7"
      )
      .fromTo(".hero-cta", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0 }, 
        "-=0.8"
      )
      .fromTo(".hero-terminal", 
        { opacity: 0, y: 30, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1 }, 
        0.2
      );
    },
    { scope: heroRef }
  );

  return (
    <>
    <div ref={heroRef} className="relative min-h-[90vh] overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-background" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(255,97,97,0.10) 0%, rgba(161,19,26,0.05) 40%, transparent 70%)" }}
        aria-hidden="true"
      />
      {/* Fade at bottom to blend into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-background))" }}
        aria-hidden="true"
      />
      <HeroBackground isMobile={isMobile} />

      {/* ── Hero ── */}
      <div className="relative z-10 min-h-[90vh] flex items-center justify-center">
        <div className="w-full max-w-[1240px] px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <h1 className="hero-display" style={{ lineHeight: 1.15 }}>
                <span className="hero-word inline-block opacity-0 translate-y-2">Audio</span>
                <br />
                <span className="hero-word inline-block opacity-0 translate-y-2">intelligence</span>
                <br />
                <span className="hero-word inline-block opacity-0 translate-y-2 text-[#ff6161]">built for you.</span>
              </h1>

              <p className="hero-sub mt-5 max-w-[480px] text-[17px] leading-[1.65] text-muted-foreground opacity-0">
                Sonclarus uses AI to cleanly separate speakers and generate accurate transcripts — all in one seamless pipeline.
              </p>

              <div className="hero-cta mt-7 flex flex-wrap items-center gap-3 opacity-0">
                <Link href="/register" className="rounded-full bg-[#fafaf9] px-6 py-3 text-[14px] font-medium text-[#1c1917] transition-all hover:bg-[#e7e5e4]">Get started free</Link>
                <button
                  onClick={scrollToFeatures}
                  className="rounded-full border border-border px-6 py-3 text-[14px] font-medium text-foreground transition-all hover:border-border-control hover:bg-muted"
                >
                  Learn more
                </button>
              </div>
            </div>
            {/* Right: terminal */}
            <div className="hero-terminal opacity-0">
              <Terminal />
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ── Features ── */}
    <section ref={featuresRef} id="features" className="bg-background px-6 py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[1240px]">
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="hero-display mt-2 text-primary">Built for clarity</h2>
            <p className="mt-3 max-w-[520px] mx-auto text-[17px] text-muted-foreground">
              Three capabilities that make audio processing effortless.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren gap={0.08} className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f) => (
            <TiltCard key={f.title} intensity={12} className="h-full">
              <div
                className="flex h-full flex-col rounded-lg border border-border bg-muted p-6"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.3)" }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-md"
                  style={{ background: f.soft }}
                >
                  {f.icon}
                </div>
                <h3 className="text-[17px] font-medium text-foreground">{f.title}</h3>
                <p className="mt-2 flex-1 text-[15px] text-muted-foreground">{f.description}</p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-1 w-6 rounded-full" style={{ background: f.color, opacity: 0.7 }} />
                  <span className="text-[12px] text-foreground-faint">Core feature</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </StaggerChildren>
      </div>
    </section>

    {/* ── CTA band ── */}
    <section className="bg-background px-6 py-[var(--spacing-section)]">
      <FadeIn>
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="hero-display text-primary">
            Ready to separate your audio?
          </h2>
          <p className="mt-4 text-[17px] text-muted-foreground">
            Create a free account and process your first file in minutes.
          </p>
          <Link
            href="/register"
            className="mx-auto mt-8 inline-block rounded-full bg-[#fafaf9] px-6 py-3 text-[14px] font-medium text-[#1c1917] transition-all hover:bg-[#e7e5e4]"
          >
            Start processing
          </Link>
        </div>
      </FadeIn>
    </section>

    {/* ── Shubham's Intro ── */}
    <section className="bg-background px-6 py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[1240px]">
        <FadeIn>
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-2 text-[12px] text-foreground-faint">About the creator</p>
              <h2 className="hero-display text-primary">
                Hi there, I&apos;m{" "}
                <span className="text-primary-blue">Shubham</span>
              </h2>
              <p className="mt-4 text-[17px] leading-[1.65] text-muted-foreground">
                Backend Engineer building scalable systems with Python, FastAPI, Docker, and AWS.
                I architect APIs from the ground up — designing efficient data models, implementing
                async processing, and deploying containerized services that handle real-world load.
              </p>
              <p className="mt-4 text-[15px] text-foreground-faint">
                Sonclarus is my passion project — a cloud-native audio intelligence platform that
                combines DeepFilterNet, SepFormer, and Faster-Whisper into a single seamless pipeline.
              </p>
            </div>

            <TiltCard intensity={10} className="h-full">
              <div className="rounded-2xl border border-border bg-muted p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_4px_24px_rgba(0,0,0,0.3)]">
                <p className="mb-4 text-[15px] font-medium text-foreground">Connect with me</p>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://github.com/Shubhtistic"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-muted-foreground transition-all hover:border-border-control hover:bg-muted"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span className="text-[15px]">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/shubhtistic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-muted-foreground transition-all hover:border-border-control hover:bg-muted"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span className="text-[15px]">LinkedIn</span>
                  </a>
                  <a
                    href="https://www.instagram.com/shubhtistic/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-muted-foreground transition-all hover:border-border-control hover:bg-muted"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="text-[15px]">Instagram</span>
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
