"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Terminal from "@/components/Terminal";
import Scanner from "@/components/Scanner";
import ProfileCard from "@/components/ProfileCard";
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
  const heroRef = useRef<HTMLDivElement>(null);

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
      .fromTo(".hero-terminal", 
        { opacity: 0, y: 30, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1 }, 
        "-=0.8"
      );
    },
    { scope: heroRef }
  );

  return (
    <>
    <div ref={heroRef} className="relative min-h-[90vh] overflow-hidden">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(255,97,97,0.10) 0%, rgba(161,19,26,0.05) 40%, transparent 70%)" }}
        aria-hidden="true"
      />
      <Scanner className="absolute inset-0 pointer-events-none" />

      {/* Bottom fade to blend hero into features section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-64 z-10"
        style={{ background: "linear-gradient(to bottom, transparent, var(--color-background))" }}
        aria-hidden="true"
      />

      {/* ── Hero ── */}
      <div className="relative z-10 min-h-[90vh] flex items-center justify-center">
        <div className="w-full max-w-[1480px] px-14">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <h1 className="hero-display" style={{ lineHeight: 1.15 }}>
                <span className="hero-word inline-block opacity-0 translate-y-2">Denoise.</span>
                <br />
                <span className="hero-word inline-block opacity-0 translate-y-2">Separate.</span>
                <br />
                <span className="hero-word inline-block opacity-0 translate-y-2 text-[#ff6161] font-fraunces-utility italic">Transcribe.</span>
              </h1>

              <p className="hero-sub mt-5 max-w-[480px] font-body text-[17px] leading-[1.65] text-muted-foreground opacity-0">
                Sonclarus uses AI to cleanly separate speakers and generate accurate transcripts — all in one seamless pipeline.
              </p>
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
    <section id="features" className="px-14 py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[1480px]">
        <FadeIn>
          <div className="mb-10 text-center">
            <h2 className="hero-display mt-2 text-primary">Built for clarity</h2>
            <p className="mt-3 max-w-[520px] mx-auto font-body text-[17px] text-muted-foreground">
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
                <h3 className="font-heading-utility text-[17px] font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 flex-1 font-body text-[15px] text-muted-foreground">{f.description}</p>
                <div className="mt-5 flex items-center gap-2">
                  <span className="h-1 w-6 rounded-full" style={{ background: f.color, opacity: 0.7 }} />
                  <span className="caption-sm text-foreground-faint">Core feature</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </StaggerChildren>
      </div>
    </section>

    {/* ── Shubham&apos;s Intro ── */}
    <section className="px-14 py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[1480px]">
        <FadeIn>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto]">
            <div className="w-full lg:pr-12">
              <p className="mb-2 caption-sm text-foreground-faint">About the creator</p>
              <h2 className="hero-display text-primary">
                Hi there, I&apos;m{" "}
                <span className="text-primary-blue font-fraunces-utility italic">Shubham</span>
              </h2>
              <p className="mt-4 font-body text-[19px] leading-[1.65] text-muted-foreground w-full">
                Backend Engineer building scalable systems with Python, FastAPI, Docker, and AWS.
                I architect APIs from the ground up — designing efficient data models, implementing
                async processing, and deploying containerized services that handle real-world load.
              </p>
              <p className="mt-4 font-body text-[17px] text-foreground-faint w-full">
                Sonclarus is my passion project — a cloud-native audio intelligence platform that
                combines DeepFilterNet, SepFormer, and Faster-Whisper into a single seamless pipeline.
              </p>
            </div>

            <div className="flex w-full items-start justify-center lg:justify-end min-h-[450px]">
              <div className="transform scale-[0.85] origin-top lg:origin-top-right">
                <ProfileCard
                  name="Shubham"
                  title="Backend Engineer"
                  handle="shubham"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/assets/profile.png"
                  showUserInfo={false}
                  enableTilt={true}
                  enableMobileTilt={false}
                  onContactClick={() => {
                    if (typeof window !== "undefined") {
                      window.location.href = "mailto:hello@sonclarus.com";
                    }
                  }}
                  iconUrl="/assets/demo/iconpattern.png"
                  behindGlowEnabled
                  innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
    </>
  );
}
